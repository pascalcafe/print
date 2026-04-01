import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { AuditService } from "./audit.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("audit")
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Permissions("audit.view")
  list(
    @CurrentSession() session: SessionUser,
    @Query("action") action?: string,
    @Query("entityType") entityType?: string,
    @Query("search") search?: string
  ) {
    return this.auditService.list(session.tenantId, { action, entityType, search });
  }
}
