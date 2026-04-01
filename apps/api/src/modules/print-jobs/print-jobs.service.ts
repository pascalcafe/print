import { randomUUID } from "node:crypto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, PrintJobStatus } from "@prisma/client";
import { AuditService } from "../audit/audit.service";
import type { SessionUser } from "../auth/types/session-user";
import { getCorrelationId } from "../observability/request-context";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePrintJobDto } from "./dto/create-print-job.dto";
import { RepeatPrintJobDto } from "./dto/repeat-print-job.dto";

const toJson = (value: unknown) => value as Prisma.InputJsonValue;

type PrintJobFilters = {
  search?: string;
  status?: string;
};

@Injectable()
export class PrintJobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService
  ) {}

  private async findExistingIdempotentJob(tenantId: string, idempotencyKey?: string) {
    if (!idempotencyKey) {
      return null;
    }

    return this.prisma.printJob.findFirst({
      where: {
        tenantId,
        idempotencyKey
      },
      include: {
        events: {
          orderBy: {
            createdAt: "desc"
          },
          take: 5
        }
      }
    });
  }

  async list(tenantId: string, filters?: PrintJobFilters) {
    return this.prisma.printJob.findMany({
      where: {
        tenantId,
        ...(filters?.status ? { status: filters.status as PrintJobStatus } : {}),
        ...(filters?.search
          ? {
              OR: [
                {
                  id: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                },
                {
                  template: {
                    name: {
                      contains: filters.search,
                      mode: "insensitive"
                    }
                  }
                },
                {
                  printer: {
                    name: {
                      contains: filters.search,
                      mode: "insensitive"
                    }
                  }
                }
              ]
            }
          : {})
      },
      include: {
        printer: true,
        printProfile: true,
        template: {
          select: {
            id: true,
            name: true
          }
        },
        events: {
          orderBy: { createdAt: "desc" },
          take: 5
        },
        dispatchAttempts: {
          orderBy: {
            createdAt: "desc"
          },
          take: 3
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async getById(id: string, tenantId: string) {
    const job = await this.prisma.printJob.findFirst({
      where: {
        id,
        tenantId
      },
      include: {
        template: true,
        printer: true,
        printProfile: true,
        requestedBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        canceledBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reprintOfJob: {
          select: {
            id: true,
            status: true,
            createdAt: true
          }
        },
        events: {
          orderBy: { createdAt: "desc" }
        },
        dispatchAttempts: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    if (!job) {
      throw new NotFoundException("Job nao encontrado");
    }

    return job;
  }

  async create(payload: CreatePrintJobDto, session: SessionUser) {
    const existing = await this.findExistingIdempotentJob(
      session.tenantId,
      payload.idempotencyKey
    );
    if (existing) {
      return existing;
    }

    const template = await this.prisma.template.findFirst({
      where: {
        id: payload.templateId,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado para impressao");
    }

    const correlationId = getCorrelationId() ?? randomUUID();

    const job = await this.prisma.printJob.create({
      data: {
        tenantId: session.tenantId,
        templateId: payload.templateId,
        templateVersion: template.currentVersion,
        printerId: payload.printerId,
        printProfileId: payload.printProfileId,
        requestedById: session.userId,
        correlationId,
        idempotencyKey: payload.idempotencyKey ?? randomUUID(),
        maxAttempts: payload.maxAttempts ?? 3,
        mode: payload.mode ?? "test",
        status: PrintJobStatus.QUEUED,
        payloadJson: toJson(payload.payload),
        events: {
          create: {
            type: "job.created",
            message: "Job de impressao registrado",
            correlationId,
            payloadJson: toJson(payload.payload)
          }
        }
      },
      include: {
        events: true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintJob",
      entityId: job.id,
      action: "print-job.created",
      payload: {
        templateId: payload.templateId,
        mode: payload.mode ?? "test",
        templateVersion: template.currentVersion,
        correlationId
      }
    });

    return job;
  }

  async createTest(payload: CreatePrintJobDto, session: SessionUser) {
    const existing = await this.findExistingIdempotentJob(
      session.tenantId,
      payload.idempotencyKey
    );
    if (existing) {
      return existing;
    }

    const template = await this.prisma.template.findFirst({
      where: {
        id: payload.templateId,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado para impressao");
    }

    const simulateFailure = payload.payload?.simulateFailure === true;
    const status = simulateFailure ? PrintJobStatus.FAILED : PrintJobStatus.COMPLETED;
    const correlationId = getCorrelationId() ?? randomUUID();

    const job = await this.prisma.printJob.create({
      data: {
        tenantId: session.tenantId,
        templateId: payload.templateId,
        templateVersion: template.currentVersion,
        printerId: payload.printerId,
        printProfileId: payload.printProfileId,
        requestedById: session.userId,
        correlationId,
        idempotencyKey: payload.idempotencyKey ?? randomUUID(),
        maxAttempts: payload.maxAttempts ?? 3,
        mode: "test",
        status,
        payloadJson: toJson(payload.payload),
        resultJson: simulateFailure
          ? toJson({
              simulated: true,
              failedAt: new Date().toISOString()
            })
          : toJson({
              simulated: true,
              printedAt: new Date().toISOString()
            }),
        failureReason: simulateFailure ? "Falha simulada para validacao operacional" : undefined,
        completedAt: simulateFailure ? undefined : new Date(),
        events: {
          create: simulateFailure
            ? [
                {
                  type: "job.created",
                  message: "Job de impressao teste criado",
                  correlationId,
                  payloadJson: toJson(payload.payload)
                },
                {
                  type: "job.failed",
                  message: "Impressao teste simulou uma falha operacional",
                  correlationId,
                  payloadJson: toJson({
                    simulated: true,
                    reason: "Falha simulada para validacao operacional"
                  })
                }
              ]
            : [
                {
                  type: "job.created",
                  message: "Job de impressao teste criado",
                  correlationId,
                  payloadJson: toJson(payload.payload)
                },
                {
                  type: "job.completed",
                  message: "Impressao teste simulada com sucesso",
                  correlationId,
                  payloadJson: toJson({
                    simulated: true
                  })
                }
              ]
        }
      },
      include: {
        events: true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintJob",
      entityId: job.id,
      action: simulateFailure ? "print-job.failed" : "print-job.test",
      payload: {
        templateId: payload.templateId,
        printerId: payload.printerId,
        templateVersion: template.currentVersion,
        correlationId
      }
    });

    return job;
  }

  async reprint(id: string, payload: RepeatPrintJobDto, session: SessionUser) {
    const existing = await this.findExistingIdempotentJob(
      session.tenantId,
      payload.idempotencyKey
    );
    if (existing) {
      return existing;
    }

    const source = await this.getById(id, session.tenantId);
    const correlationId = getCorrelationId() ?? source.correlationId ?? randomUUID();

    const nextJob = await this.prisma.printJob.create({
      data: {
        tenantId: session.tenantId,
        templateId: source.templateId,
        templateVersion: source.templateVersion,
        printerId: payload.printerId ?? source.printerId ?? undefined,
        printProfileId: payload.printProfileId ?? source.printProfileId ?? undefined,
        requestedById: session.userId,
        reprintOfJobId: source.id,
        correlationId,
        idempotencyKey: payload.idempotencyKey ?? randomUUID(),
        maxAttempts: source.maxAttempts ?? 3,
        retryCount: source.retryCount,
        mode: source.mode,
        status: source.mode === "test" ? PrintJobStatus.COMPLETED : PrintJobStatus.QUEUED,
        payloadJson: toJson(payload.payload ?? (source.payloadJson as Record<string, unknown>)),
        resultJson:
          source.mode === "test"
            ? toJson({
                simulated: true,
                printedAt: new Date().toISOString(),
                sourceJobId: source.id
              })
            : undefined,
        completedAt: source.mode === "test" ? new Date() : undefined,
        events: {
          create: [
            {
              type: "job.reprint.created",
              message: "Reimpressao registrada",
              correlationId,
              payloadJson: toJson({
                sourceJobId: source.id
              })
            },
            ...(source.mode === "test"
              ? [
                  {
                    type: "job.completed",
                    message: "Reimpressao teste simulada com sucesso",
                    correlationId,
                    payloadJson: toJson({
                      sourceJobId: source.id,
                      simulated: true
                    })
                  }
                ]
              : [])
          ]
        }
      },
      include: {
        events: true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintJob",
      entityId: nextJob.id,
      action: "print-job.reprint",
      payload: {
        sourceJobId: source.id,
        templateVersion: source.templateVersion,
        correlationId
      }
    });

    return nextJob;
  }

  async retry(id: string, payload: RepeatPrintJobDto, session: SessionUser) {
    const existing = await this.findExistingIdempotentJob(
      session.tenantId,
      payload.idempotencyKey
    );
    if (existing) {
      return existing;
    }

    const source = await this.getById(id, session.tenantId);

    const nextRetryCount = source.retryCount + 1;
    const correlationId = getCorrelationId() ?? source.correlationId ?? randomUUID();
    const nextJob = await this.prisma.printJob.create({
      data: {
        tenantId: session.tenantId,
        templateId: source.templateId,
        templateVersion: source.templateVersion,
        printerId: payload.printerId ?? source.printerId ?? undefined,
        printProfileId: payload.printProfileId ?? source.printProfileId ?? undefined,
        requestedById: session.userId,
        reprintOfJobId: source.id,
        correlationId,
        idempotencyKey: payload.idempotencyKey ?? randomUUID(),
        maxAttempts: source.maxAttempts ?? 3,
        retryCount: nextRetryCount,
        mode: source.mode,
        status: source.mode === "test" ? PrintJobStatus.COMPLETED : PrintJobStatus.QUEUED,
        payloadJson: toJson(payload.payload ?? (source.payloadJson as Record<string, unknown>)),
        resultJson:
          source.mode === "test"
            ? toJson({
                simulated: true,
                printedAt: new Date().toISOString(),
                retryOfJobId: source.id
              })
            : undefined,
        completedAt: source.mode === "test" ? new Date() : undefined,
        events: {
          create: [
            {
              type: "job.retry.created",
              message: "Retry do job registrado",
              correlationId,
              payloadJson: toJson({
                sourceJobId: source.id,
                retryCount: nextRetryCount
              })
            },
            ...(source.mode === "test"
              ? [
                  {
                    type: "job.completed",
                    message: "Retry teste simulou sucesso",
                    correlationId,
                    payloadJson: toJson({
                      sourceJobId: source.id,
                      retryCount: nextRetryCount,
                      simulated: true
                    })
                  }
                ]
              : [])
          ]
        }
      },
      include: {
        events: true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintJob",
      entityId: nextJob.id,
      action: "print-job.retry",
      payload: {
        sourceJobId: source.id,
        retryCount: nextRetryCount,
        correlationId
      }
    });

    return nextJob;
  }

  async cancel(id: string, session: SessionUser) {
    const job = await this.getById(id, session.tenantId);

    if (job.status === PrintJobStatus.COMPLETED || job.status === PrintJobStatus.CANCELED) {
      return job;
    }

    const updated = await this.prisma.printJob.update({
      where: { id },
      data: {
        status: PrintJobStatus.CANCELED,
        canceledAt: new Date(),
        canceledById: session.userId,
        events: {
          create: {
            type: "job.canceled",
            message: "Job cancelado manualmente",
            correlationId: getCorrelationId() ?? job.correlationId ?? randomUUID(),
            payloadJson: toJson({
              canceledById: session.userId
            })
          }
        }
      },
      include: {
        events: true
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintJob",
      entityId: id,
      action: "print-job.canceled",
      payload: {
        previousStatus: job.status
      }
    });

    return updated;
  }
}
