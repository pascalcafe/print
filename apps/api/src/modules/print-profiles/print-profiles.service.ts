import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuditService } from "../audit/audit.service";
import type { SessionUser } from "../auth/types/session-user";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePrintProfileDto } from "./dto/create-print-profile.dto";

@Injectable()
export class PrintProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService
  ) {}

  async list(tenantId: string) {
    return this.prisma.printProfile.findMany({
      where: { tenantId },
      include: { printer: true },
      orderBy: { name: "asc" }
    });
  }

  async create(payload: CreatePrintProfileDto, session: SessionUser) {
    const profile = await this.prisma.printProfile.create({
      data: {
        tenantId: session.tenantId,
        printerId: payload.printerId,
        name: payload.name,
        mediaType: payload.mediaType,
        darkness: payload.darkness,
        speed: payload.speed,
        copiesDefault: payload.copiesDefault,
        optionsJson: payload.optionsJson as Prisma.InputJsonValue | undefined
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "PrintProfile",
      entityId: profile.id,
      action: "print-profile.created",
      payload: { name: profile.name, printerId: profile.printerId }
    });

    return profile;
  }
}
