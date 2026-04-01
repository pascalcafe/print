import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import type { AgentNode } from "@prisma/client";
import { CurrentAgent } from "./decorators/current-agent.decorator";
import { HeartbeatDto } from "./dto/heartbeat.dto";
import { ReportDispatchResultDto } from "./dto/report-dispatch-result.dto";
import { AgentTokenGuard } from "./guards/agent-token.guard";
import { AgentsService } from "./agents.service";

@UseGuards(AgentTokenGuard)
@Controller("agent-runtime")
export class AgentRuntimeController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post("heartbeat")
  heartbeat(@CurrentAgent() agent: AgentNode, @Body() body: HeartbeatDto) {
    return this.agentsService.heartbeat(agent, body);
  }

  @Get("jobs/next")
  nextJob(@CurrentAgent() agent: AgentNode) {
    return this.agentsService.claimNextJob(agent);
  }

  @Post("dispatch-attempts/:id/result")
  result(
    @CurrentAgent() agent: AgentNode,
    @Param("id") id: string,
    @Body() body: ReportDispatchResultDto
  ) {
    return this.agentsService.reportDispatchResult(agent, id, body);
  }
}
