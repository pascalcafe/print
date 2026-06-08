import { Injectable, NotFoundException } from "@nestjs/common";
import { AuditService } from "../audit/audit.service";
import type { SessionUser } from "../auth/types/session-user";
import { PrismaService } from "../prisma/prisma.service";
import { AssignPrinterAgentDto } from "./dto/assign-printer-agent.dto";
import { CreatePrinterDto } from "./dto/create-printer.dto";
import { UpdatePrinterStatusDto } from "./dto/update-printer-status.dto";

@Injectable()
export class PrintersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService
  ) {}

  async list(tenantId: string, filters?: { search?: string; active?: string }) {
    return this.prisma.printer.findMany({
      where: {
        tenantId,
        ...(filters?.active === "true" ? { isActive: true } : {}),
        ...(filters?.active === "false" ? { isActive: false } : {}),
        ...(filters?.search
          ? {
              OR: [
                {
                  name: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                },
                {
                  code: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                }
              ]
            }
          : {})
      },
      include: {
        agentNode: {
          select: {
            id: true,
            name: true,
            code: true,
            lastSeenAt: true
          }
        }
      },
      orderBy: { name: "asc" }
    });
  }

  async create(payload: CreatePrinterDto, session: SessionUser) {
    const printer = await this.prisma.printer.create({
      data: {
        tenantId: session.tenantId,
        name: payload.name,
        code: payload.code,
        manufacturer: payload.manufacturer,
        model: payload.model,
        dpi: payload.dpi,
        connectionType: payload.connectionType,
        endpoint: payload.endpoint,
        agentNodeId: payload.agentNodeId,
        isActive: payload.isActive
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Printer",
      entityId: printer.id,
      action: "printer.created",
      payload: { name: printer.name, code: printer.code }
    });

    return printer;
  }

  async updateStatus(id: string, payload: UpdatePrinterStatusDto, session: SessionUser) {
    const printer = await this.prisma.printer.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!printer) {
      throw new NotFoundException("Impressora nao encontrada");
    }

    const updated = await this.prisma.printer.update({
      where: { id },
      data: {
        isActive: payload.isActive
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Printer",
      entityId: updated.id,
      action: "printer.status.updated",
      payload: {
        previousStatus: printer.isActive,
        nextStatus: updated.isActive
      }
    });

    return updated;
  }

  async assignAgent(id: string, payload: AssignPrinterAgentDto, session: SessionUser) {
    const printer = await this.prisma.printer.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!printer) {
      throw new NotFoundException("Impressora nao encontrada");
    }

    if (payload.agentNodeId) {
      const agent = await this.prisma.agentNode.findFirst({
        where: {
          id: payload.agentNodeId,
          tenantId: session.tenantId
        }
      });

      if (!agent) {
        throw new NotFoundException("Agente nao encontrado para vinculacao");
      }
    }

    const updated = await this.prisma.printer.update({
      where: {
        id
      },
      data: {
        agentNodeId: payload.agentNodeId ?? null
      },
      include: {
        agentNode: {
          select: {
            id: true,
            name: true,
            code: true,
            lastSeenAt: true
          }
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Printer",
      entityId: updated.id,
      action: "printer.agent.assigned",
      payload: {
        previousAgentNodeId: printer.agentNodeId,
        nextAgentNodeId: updated.agentNodeId
      }
    });

    return updated;
  }
}
