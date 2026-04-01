import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreateIdentityProviderDto } from "./dto/create-identity-provider.dto";
import { ExchangeOidcLoginDto } from "./dto/exchange-oidc-login.dto";
import { StartOidcLoginDto } from "./dto/start-oidc-login.dto";
import { IdentityService } from "./identity.service";

@Controller("identity")
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Get("public/providers")
  listPublic(@Query("tenantSlug") tenantSlug = "default") {
    return this.identityService.listPublicProviders(tenantSlug);
  }

  @Post("public/oidc/:providerSlug/start")
  start(
    @Param("providerSlug") providerSlug: string,
    @Body() body: StartOidcLoginDto
  ) {
    return this.identityService.startOidcLogin(providerSlug, body);
  }

  @Post("public/oidc/:providerSlug/exchange")
  exchange(
    @Param("providerSlug") providerSlug: string,
    @Body() body: ExchangeOidcLoginDto
  ) {
    return this.identityService.exchangeOidcLogin(providerSlug, body);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get("providers")
  @Permissions("identity.view")
  list(@CurrentSession() session: SessionUser) {
    return this.identityService.list(session.tenantId);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post("providers")
  @Permissions("identity.manage")
  create(
    @Body() body: CreateIdentityProviderDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.identityService.createProvider(body, session);
  }
}
