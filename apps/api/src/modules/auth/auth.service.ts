import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import type { SessionUser } from "./types/session-user";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  private async findMembershipForUser(userId: string, tenantId?: string) {
    return this.prisma.userTenant.findFirst({
      where: {
        userId,
        ...(tenantId ? { tenantId } : {})
      },
      include: {
        user: true,
        tenant: true,
        role: {
          include: {
            permissions: {
              include: {
                permission: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  private buildSession(input: {
    userId: string;
    email: string;
    name: string;
    tenantId: string;
    tenantSlug: string;
    roleKey: string;
    roleName: string;
    permissions: string[];
    authMethod?: SessionUser["authMethod"];
    externalProviderId?: string;
    externalProviderName?: string;
  }): SessionUser {
    return {
      userId: input.userId,
      email: input.email,
      name: input.name,
      tenantId: input.tenantId,
      tenantSlug: input.tenantSlug,
      roleKey: input.roleKey,
      roleName: input.roleName,
      permissions: input.permissions,
      authMethod: input.authMethod,
      externalProviderId: input.externalProviderId,
      externalProviderName: input.externalProviderName
    };
  }

  async issueSessionForUser(
    userId: string,
    tenantId?: string,
    authContext?: Pick<
      SessionUser,
      "authMethod" | "externalProviderId" | "externalProviderName"
    >
  ) {
    const membership = await this.findMembershipForUser(userId, tenantId);
    if (!membership) {
      throw new UnauthorizedException("Usuario sem tenant vinculado");
    }

    const session: SessionUser = {
      ...this.buildSession({
        userId: membership.user.id,
        email: membership.user.email,
        name: membership.user.name,
        tenantId: membership.tenantId,
        tenantSlug: membership.tenant.slug,
        roleKey: membership.role.key,
        roleName: membership.role.name,
        permissions: membership.role.permissions.map(({ permission }) => permission.key),
        authMethod: authContext?.authMethod,
        externalProviderId: authContext?.externalProviderId,
        externalProviderName: authContext?.externalProviderName
      })
    };

    return {
      accessToken: await this.jwtService.signAsync(session),
      session
    };
  }

  async validatePassword(userId: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        passwordHash: true
      }
    });

    if (!user) {
      return false;
    }

    return compare(password, user.passwordHash);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true
      }
    });

    if (!user) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    const isValid = await compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    return this.issueSessionForUser(user.id, undefined, {
      authMethod: "local"
    });
  }

  async me(session: SessionUser) {
    const refreshed = await this.issueSessionForUser(session.userId, session.tenantId, {
      authMethod: session.authMethod ?? "local",
      externalProviderId: session.externalProviderId,
      externalProviderName: session.externalProviderName
    });

    return refreshed.session;
  }
}
