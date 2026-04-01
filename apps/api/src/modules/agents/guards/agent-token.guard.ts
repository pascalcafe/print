import { createHash } from "node:crypto";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { AgentNodeStatus } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AgentTokenGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      agent?: unknown;
    }>();

    const header = request.headers["x-agent-token"];
    const token =
      typeof header === "string" ? header : Array.isArray(header) ? header[0] : undefined;

    if (!token) {
      throw new UnauthorizedException("Token do agente ausente");
    }

    const authTokenHash = createHash("sha256").update(token).digest("hex");
    const agent = await this.prisma.agentNode.findFirst({
      where: {
        authTokenHash,
        status: AgentNodeStatus.ACTIVE
      }
    });

    if (!agent) {
      throw new UnauthorizedException("Token do agente invalido");
    }

    request.agent = agent;
    return true;
  }
}
