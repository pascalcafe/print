import { AgentNodeStatus, PrintJobStatus, TemplateStatus } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ObservabilityService {
  constructor(private readonly prisma: PrismaService) {}

  getLiveness() {
    return {
      status: "ok",
      service: "easyprint-api",
      timestamp: new Date().toISOString()
    };
  }

  async getReadiness() {
    await this.prisma.tenant.count();

    return {
      status: "ready",
      database: "up",
      timestamp: new Date().toISOString()
    };
  }

  async getMetrics() {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const [
      templateGroups,
      jobGroups,
      activePrinters,
      onlineAgents,
      pendingApprovals,
      recentFailures
    ] = await Promise.all([
      this.prisma.template.groupBy({
        by: ["status"],
        _count: {
          _all: true
        }
      }),
      this.prisma.printJob.groupBy({
        by: ["status"],
        _count: {
          _all: true
        }
      }),
      this.prisma.printer.count({
        where: {
          isActive: true
        }
      }),
      this.prisma.agentNode.count({
        where: {
          status: AgentNodeStatus.ACTIVE,
          lastSeenAt: {
            gte: twoMinutesAgo
          }
        }
      }),
      this.prisma.templateApproval.count({
        where: {
          status: "PENDING"
        }
      }),
      this.prisma.printJob.count({
        where: {
          status: PrintJobStatus.FAILED,
          updatedAt: {
            gte: fifteenMinutesAgo
          }
        }
      })
    ]);

    const templatesByStatus = Object.values(TemplateStatus).reduce<Record<string, number>>(
      (accumulator, status) => {
        accumulator[status] =
          templateGroups.find((entry) => entry.status === status)?._count._all ?? 0;
        return accumulator;
      },
      {}
    );

    const jobsByStatus = Object.values(PrintJobStatus).reduce<Record<string, number>>(
      (accumulator, status) => {
        accumulator[status] = jobGroups.find((entry) => entry.status === status)?._count._all ?? 0;
        return accumulator;
      },
      {}
    );

    return {
      timestamp: new Date().toISOString(),
      templatesByStatus,
      jobsByStatus,
      activePrinters,
      onlineAgents,
      pendingApprovals,
      recentFailures
    };
  }
}
