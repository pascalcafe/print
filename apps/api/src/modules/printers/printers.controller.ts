import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { AssignPrinterAgentDto } from "./dto/assign-printer-agent.dto";
import { CreatePrinterDto } from "./dto/create-printer.dto";
import { UpdatePrinterStatusDto } from "./dto/update-printer-status.dto";
import { PrintersService } from "./printers.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("printers")
export class PrintersController {
  constructor(private readonly printersService: PrintersService) {}

  @Get()
  @Permissions("printer.view")
  list(
    @CurrentSession() session: SessionUser,
    @Query("search") search?: string,
    @Query("active") active?: string
  ) {
    return this.printersService.list(session.tenantId, { search, active });
  }

  @Post()
  @Permissions("printer.manage")
  create(@Body() body: CreatePrinterDto, @CurrentSession() session: SessionUser) {
    return this.printersService.create(body, session);
  }

  @Post(":id/status")
  @Permissions("printer.manage")
  updateStatus(
    @Param("id") id: string,
    @Body() body: UpdatePrinterStatusDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.printersService.updateStatus(id, body, session);
  }

  @Post(":id/agent")
  @Permissions("printer.manage")
  assignAgent(
    @Param("id") id: string,
    @Body() body: AssignPrinterAgentDto,
    @CurrentSession() session: SessionUser
  ) {
    return this.printersService.assignAgent(id, body, session);
  }
}
