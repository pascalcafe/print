import { createHash, randomBytes, randomUUID } from "node:crypto";
import {
  AgentNodeStatus,
  JobDispatchAttemptStatus,
  Prisma,
  PrintJobStatus,
  type AgentNode
} from "@prisma/client";
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import type { SessionUser } from "../auth/types/session-user";
import { getCorrelationId } from "../observability/request-context";
import { CreateAgentNodeDto } from "./dto/create-agent-node.dto";
import { HeartbeatDto } from "./dto/heartbeat.dto";
import { ReportDispatchResultDto } from "./dto/report-dispatch-result.dto";

const toJson = (value: unknown) => value as Prisma.InputJsonValue | undefined;

@Injectable()
export class AgentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService
  ) {}

  async list(tenantId: string) {
    return this.prisma.agentNode.findMany({
      where: {
        tenantId
      },
      include: {
        printers: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        heartbeats: {
          orderBy: {
            createdAt: "desc"
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async create(payload: CreateAgentNodeDto, session: SessionUser) {
    const rawToken = `epa_${randomBytes(24).toString("hex")}`;
    const authTokenHash = createHash("sha256").update(rawToken).digest("hex");

    const agent = await this.prisma.agentNode.create({
      data: {
        tenantId: session.tenantId,
        name: payload.name,
        code: payload.code,
        description: payload.description,
        authTokenHash,
        metadataJson: toJson(payload.metadata)
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "AgentNode",
      entityId: agent.id,
      action: "agent.created",
      payload: {
        code: agent.code
      }
    });

    return {
      ...agent,
      token: rawToken
    };
  }

  async rotateToken(id: string, session: SessionUser) {
    const agent = await this.prisma.agentNode.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!agent) {
      throw new NotFoundException("Agente nao encontrado");
    }

    const rawToken = `epa_${randomBytes(24).toString("hex")}`;
    const authTokenHash = createHash("sha256").update(rawToken).digest("hex");
    const updated = await this.prisma.agentNode.update({
      where: {
        id
      },
      data: {
        authTokenHash
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "AgentNode",
      entityId: id,
      action: "agent.token.rotated",
      payload: {
        code: updated.code
      }
    });

    return {
      ...updated,
      token: rawToken
    };
  }

  async heartbeat(agent: AgentNode, payload: HeartbeatDto) {
    await this.prisma.agentNode.update({
      where: {
        id: agent.id
      },
      data: {
        lastSeenAt: new Date(),
        version: payload.version ?? agent.version,
        metadataJson: payload.metadata
          ? toJson(payload.metadata)
          : agent.metadataJson === null
            ? Prisma.JsonNull
            : (agent.metadataJson as Prisma.InputJsonValue | undefined)
      }
    });

    await this.prisma.agentHeartbeat.create({
      data: {
        agentNodeId: agent.id,
        status: payload.status,
        version: payload.version,
        hostname: payload.hostname,
        metadataJson: toJson(payload.metadata)
      }
    });

    return {
      acknowledged: true,
      serverTime: new Date().toISOString()
    };
  }

  async claimNextJob(agent: AgentNode) {
    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      const job = await tx.printJob.findFirst({
        where: {
          tenantId: agent.tenantId,
          status: PrintJobStatus.QUEUED,
          OR: [
            {
              nextAttemptAt: null
            },
            {
              nextAttemptAt: {
                lte: now
              }
            }
          ],
          printer: {
            is: {
              agentNodeId: agent.id,
              isActive: true
            }
          }
        },
        include: {
          printer: true,
          printProfile: true,
          template: {
            select: {
              id: true,
              name: true,
              currentVersion: true
            }
          },
          dispatchAttempts: {
            orderBy: {
              attemptNumber: "desc"
            },
            take: 1
          }
        },
        orderBy: {
          createdAt: "asc"
        }
      });

      if (!job) {
        return null;
      }

      const claimResult = await tx.printJob.updateMany({
        where: {
          id: job.id,
          status: PrintJobStatus.QUEUED
        },
        data: {
          status: PrintJobStatus.RUNNING,
          nextAttemptAt: null
        }
      });

      if (claimResult.count === 0) {
        return null;
      }

      const attemptNumber = (job.dispatchAttempts[0]?.attemptNumber ?? 0) + 1;
      const correlationId = job.correlationId ?? getCorrelationId() ?? randomUUID();
      const dispatchAttempt = await tx.jobDispatchAttempt.create({
        data: {
          printJobId: job.id,
          agentNodeId: agent.id,
          status: JobDispatchAttemptStatus.CLAIMED,
          attemptNumber,
          idempotencyKey: randomUUID(),
          correlationId,
          scheduledAt: job.nextAttemptAt ?? now,
          claimedAt: now
        }
      });

      await tx.printJobEvent.create({
        data: {
          printJobId: job.id,
          type: "job.dispatched",
          message: "Job entregue ao agente local",
          correlationId,
          payloadJson: {
            agentNodeId: agent.id,
            dispatchAttemptId: dispatchAttempt.id
          }
        }
      });

      return {
        dispatchAttemptId: dispatchAttempt.id,
        correlationId,
        job: {
          id: job.id,
          mode: job.mode,
          templateId: job.templateId,
          templateVersion: job.templateVersion ?? job.template.currentVersion,
          payload: job.payloadJson,
          printer: job.printer,
          printProfile: job.printProfile
        }
      };
    });
  }

  async reportDispatchResult(
    agent: AgentNode,
    dispatchAttemptId: string,
    payload: ReportDispatchResultDto
  ) {
    const attempt = await this.prisma.jobDispatchAttempt.findFirst({
      where: {
        id: dispatchAttemptId,
        agentNodeId: agent.id
      },
      include: {
        printJob: true
      }
    });

    if (!attempt) {
      throw new NotFoundException("Tentativa de dispatch nao encontrada");
    }

    if (attempt.status !== JobDispatchAttemptStatus.CLAIMED) {
      throw new BadRequestException("A tentativa informada nao esta em execucao");
    }

    const now = new Date();
    const correlationId = attempt.correlationId ?? attempt.printJob.correlationId ?? randomUUID();

    if (payload.status === "completed") {
      const [, updatedJob] = await this.prisma.$transaction([
        this.prisma.jobDispatchAttempt.update({
          where: {
            id: dispatchAttemptId
          },
          data: {
            status: JobDispatchAttemptStatus.COMPLETED,
            completedAt: now,
            responseJson: toJson(payload.response)
          }
        }),
        this.prisma.printJob.update({
          where: {
            id: attempt.printJobId
          },
          data: {
            status: PrintJobStatus.COMPLETED,
            completedAt: now,
            failureReason: null,
            resultJson: toJson(payload.response),
            events: {
              create: {
                type: "job.completed",
                message: "Job concluido pelo agente local",
                correlationId,
                payloadJson: {
                  agentNodeId: agent.id
                }
              }
            }
          }
        })
      ]);

      return updatedJob;
    }

    const nextRetryCount = attempt.printJob.retryCount + 1;
    const canRetry =
      Boolean(payload.retryable) && nextRetryCount < attempt.printJob.maxAttempts;
    const backoffMinutes = Math.min(10, Math.max(1, nextRetryCount * 2));
    const nextAttemptAt = new Date(Date.now() + backoffMinutes * 60 * 1000);

    const [, updatedJob] = await this.prisma.$transaction([
      this.prisma.jobDispatchAttempt.update({
        where: {
          id: dispatchAttemptId
        },
        data: {
          status: canRetry
            ? JobDispatchAttemptStatus.RETRY_SCHEDULED
            : JobDispatchAttemptStatus.FAILED,
          completedAt: now,
          errorMessage: payload.errorMessage,
          responseJson: toJson(payload.response)
        }
      }),
      this.prisma.printJob.update({
        where: {
          id: attempt.printJobId
        },
        data: {
          status: canRetry ? PrintJobStatus.QUEUED : PrintJobStatus.FAILED,
          retryCount: canRetry ? nextRetryCount : attempt.printJob.retryCount,
          nextAttemptAt: canRetry ? nextAttemptAt : null,
          failureReason: payload.errorMessage ?? "Falha reportada pelo agente local",
          events: {
            create: canRetry
              ? [
                  {
                    type: "job.failed",
                    message: "Falha transitória reportada pelo agente local",
                    correlationId,
                    payloadJson: {
                      agentNodeId: agent.id,
                      errorMessage: payload.errorMessage
                    }
                  },
                  {
                    type: "job.retry.scheduled",
                    message: "Retry automatico agendado",
                    correlationId,
                    payloadJson: {
                      nextAttemptAt: nextAttemptAt.toISOString(),
                      retryCount: nextRetryCount
                    }
                  }
                ]
              : {
                  type: "job.failed",
                  message: "Falha definitiva reportada pelo agente local",
                  correlationId,
                  payloadJson: {
                    agentNodeId: agent.id,
                    errorMessage: payload.errorMessage
                  }
                }
          }
        }
      })
    ]);

    return updatedJob;
  }
}
