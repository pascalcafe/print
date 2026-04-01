import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreateAgentNodeDto } from "./dto/create-agent-node.dto";
import { AgentsService } from "./agents.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @Permissions("agent.view")
  list(@CurrentSession() session: SessionUser) {
    return this.agentsService.list(session.tenantId);
  }

  @Post()
  @Permissions("agent.manage")
  create(@Body() body: CreateAgentNodeDto, @CurrentSession() session: SessionUser) {
    return this.agentsService.create(body, session);
  }

  @Post(":id/rotate-token")
  @Permissions("agent.manage")
  rotateToken(@Param("id") id: string, @CurrentSession() session: SessionUser) {
    return this.agentsService.rotateToken(id, session);
  }
}
