import { randomBytes, randomUUID, createHash } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import {
  ExternalIdentityProviderType,
  type ExternalIdentityProvider
} from "@prisma/client";
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";
import { hash } from "bcryptjs";
import { AuditService } from "../audit/audit.service";
import { AuthService } from "../auth/auth.service";
import type { SessionUser } from "../auth/types/session-user";
import { PrismaService } from "../prisma/prisma.service";
import { StructuredLoggerService } from "../observability/structured-logger.service";
import { CreateIdentityProviderDto } from "./dto/create-identity-provider.dto";
import { ExchangeOidcLoginDto } from "./dto/exchange-oidc-login.dto";
import { StartOidcLoginDto } from "./dto/start-oidc-login.dto";

type OidcDiscoveryDocument = {
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
  jwks_uri: string;
};

const encodeBase64Url = (value: Buffer) => value.toString("base64url");

const readClaim = (payload: JWTPayload, claimPath: string, fallback?: string) => {
  const value = claimPath
    .split(".")
    .reduce<unknown>(
      (accumulator, segment) =>
        accumulator && typeof accumulator === "object"
          ? (accumulator as Record<string, unknown>)[segment]
          : undefined,
      payload
    );

  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return fallback;
};

@Injectable()
export class IdentityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly auditService: AuditService,
    private readonly logger: StructuredLoggerService
  ) {}

  async list(tenantId: string) {
    return this.prisma.externalIdentityProvider.findMany({
      where: {
        tenantId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        name: true,
        slug: true,
        type: true,
        issuerUrl: true,
        enabled: true,
        autoProvisionUsers: true,
        autoLinkByEmail: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async listPublicProviders(tenantSlug: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        slug: tenantSlug
      },
      include: {
        identityProviders: {
          where: {
            enabled: true
          },
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    });

    if (!tenant) {
      return [];
    }

    return tenant.identityProviders.map((provider) => ({
      name: provider.name,
      slug: provider.slug,
      type: provider.type
    }));
  }

  async createProvider(payload: CreateIdentityProviderDto, session: SessionUser) {
    const existing = await this.prisma.externalIdentityProvider.findFirst({
      where: {
        tenantId: session.tenantId,
        slug: payload.slug
      },
      select: {
        id: true
      }
    });

    if (existing) {
      throw new ConflictException("Ja existe um provider corporativo com este slug");
    }

    const provider = await this.prisma.externalIdentityProvider.create({
      data: {
        tenantId: session.tenantId,
        name: payload.name,
        slug: payload.slug,
        type: payload.type as ExternalIdentityProviderType,
        issuerUrl: payload.issuerUrl,
        clientId: payload.clientId,
        clientSecret: payload.clientSecret,
        authorizationUrl: payload.authorizationUrl,
        tokenUrl: payload.tokenUrl,
        userInfoUrl: payload.userInfoUrl,
        scopesJson: payload.scopes,
        claimMappingJson: payload.claimMapping as object | undefined,
        autoProvisionUsers: payload.autoProvisionUsers ?? false,
        autoLinkByEmail: payload.autoLinkByEmail ?? true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "ExternalIdentityProvider",
      entityId: provider.id,
      action: "identity-provider.created",
      payload: {
        slug: provider.slug,
        type: provider.type
      }
    });

    return provider;
  }

  async startOidcLogin(providerSlug: string, payload: StartOidcLoginDto) {
    const tenantSlug = payload.tenantSlug ?? "default";
    const provider = await this.prisma.externalIdentityProvider.findFirst({
      where: {
        slug: providerSlug,
        tenant: {
          slug: tenantSlug
        },
        enabled: true
      },
      include: {
        tenant: true
      }
    });

    if (!provider) {
      throw new NotFoundException("Provider corporativo nao encontrado");
    }

    if (provider.type !== ExternalIdentityProviderType.OIDC) {
      throw new BadRequestException("Apenas providers OIDC estao disponiveis neste fluxo");
    }

    const discovery = await this.resolveDiscovery(provider);
    const state = randomUUID();
    const nonce = randomUUID();
    const codeVerifier = encodeBase64Url(randomBytes(32));
    const codeChallenge = encodeBase64Url(
      createHash("sha256").update(codeVerifier).digest()
    );
    const scopes = this.resolveScopes(provider).join(" ");

    await this.prisma.externalAuthSession.create({
      data: {
        providerId: provider.id,
        tenantId: provider.tenantId,
        state,
        nonce,
        codeVerifier,
        redirectUri: payload.redirectUri,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    });

    const authorizationUrl = new URL(
      provider.authorizationUrl ?? discovery.authorization_endpoint
    );
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("client_id", provider.clientId);
    authorizationUrl.searchParams.set("redirect_uri", payload.redirectUri);
    authorizationUrl.searchParams.set("scope", scopes);
    authorizationUrl.searchParams.set("state", state);
    authorizationUrl.searchParams.set("nonce", nonce);
    authorizationUrl.searchParams.set("code_challenge", codeChallenge);
    authorizationUrl.searchParams.set("code_challenge_method", "S256");

    this.logger.info("auth.oidc.start", {
      providerSlug,
      tenantSlug,
      redirectUri: payload.redirectUri
    });

    return {
      authorizationUrl: authorizationUrl.toString(),
      provider: {
        name: provider.name,
        slug: provider.slug,
        type: provider.type
      }
    };
  }

  async exchangeOidcLogin(providerSlug: string, payload: ExchangeOidcLoginDto) {
    const authSession = await this.prisma.externalAuthSession.findUnique({
      where: {
        state: payload.state
      },
      include: {
        provider: true,
        tenant: true
      }
    });

    if (
      !authSession ||
      authSession.provider.slug !== providerSlug ||
      authSession.consumedAt ||
      authSession.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Sessao de login corporativo invalida ou expirada");
    }

    if (authSession.redirectUri !== payload.redirectUri) {
      throw new UnauthorizedException("Redirect URI nao confere com a sessao corporativa");
    }

    const provider = authSession.provider;
    const discovery = await this.resolveDiscovery(provider);
    const tokenEndpoint = provider.tokenUrl ?? discovery.token_endpoint;
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: payload.code,
        client_id: provider.clientId,
        ...(provider.clientSecret ? { client_secret: provider.clientSecret } : {}),
        redirect_uri: payload.redirectUri,
        code_verifier: authSession.codeVerifier
      })
    });

    if (!tokenResponse.ok) {
      this.logger.warn("auth.oidc.exchange.failed", {
        providerSlug,
        statusCode: tokenResponse.status
      });
      throw new UnauthorizedException("Nao foi possivel concluir a autenticacao corporativa");
    }

    const tokenPayload = (await tokenResponse.json()) as {
      id_token?: string;
    };

    if (!tokenPayload.id_token) {
      throw new UnauthorizedException("Provider OIDC nao retornou id_token");
    }

    const discoveryIssuer = provider.issuerUrl.replace(/\/$/, "");
    const jwks = createRemoteJWKSet(new URL(discovery.jwks_uri));
    const verification = await jwtVerify(tokenPayload.id_token, jwks, {
      issuer: discoveryIssuer,
      audience: provider.clientId
    });

    if (verification.payload.nonce !== authSession.nonce) {
      throw new UnauthorizedException("Nonce do login corporativo invalido");
    }

    const claimMapping = (provider.claimMappingJson ?? {}) as Record<string, string>;
    const subject = readClaim(verification.payload, claimMapping.subject ?? "sub");
    const email = readClaim(verification.payload, claimMapping.email ?? "email");
    const name =
      readClaim(verification.payload, claimMapping.name ?? "name", email ?? "Usuario corporativo") ??
      "Usuario corporativo";

    if (!subject) {
      throw new UnauthorizedException("Provider corporativo nao retornou um subject valido");
    }

    const { userId } = await this.resolveUserForExternalIdentity({
      provider,
      tenantId: authSession.tenantId,
      subject,
      email,
      name,
      claims: verification.payload
    });

    await this.prisma.externalAuthSession.update({
      where: {
        id: authSession.id
      },
      data: {
        consumedAt: new Date()
      }
    });

    await this.auditService.register({
      tenantId: authSession.tenantId,
      userId,
      entityType: "ExternalIdentityProvider",
      entityId: provider.id,
      action: "identity-provider.login",
      payload: {
        providerSlug: provider.slug,
        subject
      }
    });

    return this.authService.issueSessionForUser(userId, authSession.tenantId, {
      authMethod: "oidc",
      externalProviderId: provider.id,
      externalProviderName: provider.name
    });
  }

  private resolveScopes(provider: ExternalIdentityProvider) {
    const storedScopes = Array.isArray(provider.scopesJson)
      ? provider.scopesJson.filter((value): value is string => typeof value === "string")
      : [];

    return storedScopes.length > 0 ? storedScopes : ["openid", "profile", "email"];
  }

  private async resolveDiscovery(provider: ExternalIdentityProvider) {
    const response = await fetch(
      `${provider.issuerUrl.replace(/\/$/, "")}/.well-known/openid-configuration`
    );

    if (!response.ok) {
      throw new BadRequestException("Nao foi possivel carregar a discovery OIDC do provider");
    }

    return (await response.json()) as OidcDiscoveryDocument;
  }

  private async resolveUserForExternalIdentity(input: {
    provider: ExternalIdentityProvider;
    tenantId: string;
    subject: string;
    email?: string;
    name: string;
    claims: JWTPayload;
  }) {
    const existingIdentity = await this.prisma.userExternalIdentity.findUnique({
      where: {
        providerId_subject: {
          providerId: input.provider.id,
          subject: input.subject
        }
      }
    });

    if (existingIdentity) {
      await this.prisma.userExternalIdentity.update({
        where: {
          id: existingIdentity.id
        },
        data: {
          email: input.email,
          claimsJson: input.claims as object,
          lastLoginAt: new Date()
        }
      });

      return {
        userId: existingIdentity.userId
      };
    }

    let user = input.email
      ? await this.prisma.user.findUnique({
          where: {
            email: input.email
          }
        })
      : null;

    if (user && input.provider.autoLinkByEmail) {
      const membership = await this.prisma.userTenant.findUnique({
        where: {
          userId_tenantId: {
            userId: user.id,
            tenantId: input.tenantId
          }
        }
      });

      if (!membership) {
        user = null;
      }
    }

    if (!user && input.provider.autoProvisionUsers && input.email) {
      const operatorRole = await this.prisma.role.findUnique({
        where: {
          key: "operator"
        }
      });

      if (!operatorRole) {
        throw new BadRequestException("Role operator nao encontrada para provisionamento automatico");
      }

      user = await this.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
          passwordHash: await hash(randomUUID(), 10),
          memberships: {
            create: {
              tenantId: input.tenantId,
              roleId: operatorRole.id
            }
          }
        }
      });
    }

    if (!user) {
      throw new UnauthorizedException(
        "Usuario corporativo nao vinculado ao tenant e auto provisionamento desabilitado"
      );
    }

    await this.prisma.userExternalIdentity.create({
      data: {
        providerId: input.provider.id,
        userId: user.id,
        subject: input.subject,
        email: input.email,
        claimsJson: input.claims as object,
        lastLoginAt: new Date()
      }
    });

    return {
      userId: user.id
    };
  }
}
