import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreatePrintProfileDto } from "./dto/create-print-profile.dto";
import { PrintProfilesService } from "./print-profiles.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("print-profiles")
export class PrintProfilesController {
  constructor(private readonly printProfilesService: PrintProfilesService) {}

  @Get()
  @Permissions("print-profile.view")
  list(@CurrentSession() session: SessionUser) {
    return this.printProfilesService.list(session.tenantId);
  }

  @Post()
  @Permissions("print-profile.manage")
  create(@Body() body: CreatePrintProfileDto, @CurrentSession() session: SessionUser) {
    return this.printProfilesService.create(body, session);
  }
}
