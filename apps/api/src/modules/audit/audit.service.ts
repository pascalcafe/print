import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { getCorrelationId } from "../observability/request-context";
import { PrismaService } from "../prisma/prisma.service";

interface RegisterAuditEntryInput {
  tenantId: string;
  userId?: string;
  entityType: string;
  entityId: string;
  action: string;
  payload?: Record<string, unknown>;
  ipAddress?: string;
}

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    tenantId: string,
    filters?: {
      action?: string;
      entityType?: string;
      search?: string;
    }
  ) {
    return this.prisma.auditLog.findMany({
      where: {
        tenantId,
        ...(filters?.action
          ? {
              action: {
                contains: filters.action,
                mode: "insensitive"
              }
            }
          : {}),
        ...(filters?.entityType
          ? {
              entityType: {
                contains: filters.entityType,
                mode: "insensitive"
              }
            }
          : {}),
        ...(filters?.search
          ? {
              OR: [
                {
                  entityId: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                },
                {
                  action: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                }
              ]
            }
          : {})
      },
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  async register(entry: RegisterAuditEntryInput) {
    return this.prisma.auditLog.create({
      data: {
        tenantId: entry.tenantId,
        userId: entry.userId,
        entityType: entry.entityType,
        entityId: entry.entityId,
        action: entry.action,
        correlationId: getCorrelationId(),
        payloadJson: entry.payload as Prisma.InputJsonValue | undefined,
        ipAddress: entry.ipAddress
      }
    });
  }
}
