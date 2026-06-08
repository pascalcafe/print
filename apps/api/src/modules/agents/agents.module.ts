import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { AgentsController } from "./agents.controller";
import { AgentRuntimeController } from "./agent-runtime.controller";
import { AgentsService } from "./agents.service";
import { AgentTokenGuard } from "./guards/agent-token.guard";

@Module({
  imports: [AuditModule],
  controllers: [AgentsController, AgentRuntimeController],
  providers: [AgentsService, AgentTokenGuard],
  exports: [AgentsService]
})
export class AgentsModule {}
