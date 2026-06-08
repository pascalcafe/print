import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { Prisma, TemplateApprovalStatus, TemplateStatus } from "@prisma/client";
import {
  createInitialDocument,
  labelDocumentSchema,
  type LabelDataField,
  type LabelDocument,
  type LabelDocumentSettings,
  type LabelElement
} from "@easyprint/shared";
import { AuditService } from "../audit/audit.service";
import { AuthService } from "../auth/auth.service";
import type { SessionUser } from "../auth/types/session-user";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTemplateVersionDto } from "./dto/create-template-version.dto";
import { DecideTemplateApprovalDto } from "./dto/decide-template-approval.dto";
import { SaveTemplateDto } from "./dto/save-template.dto";
import { SignatureConfirmationDto } from "./dto/signature-confirmation.dto";
import { SubmitTemplateReviewDto } from "./dto/submit-template-review.dto";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toJson = (value: unknown) => value as Prisma.InputJsonValue;

const buildDataFieldRecord = (field: LabelDataField) => ({
  key: field.key,
  label: field.label,
  type: field.type,
  required: field.required,
  description: field.description,
  sampleValue: field.sampleValue === undefined ? undefined : String(field.sampleValue),
  fallbackValue: field.fallbackValue,
  formatType: field.formatType,
  formatConfigJson: field.formatConfig
    ? (field.formatConfig as Prisma.InputJsonValue)
    : undefined
});

const collectImageAssetIds = (document: LabelDocument) =>
  document.elements.flatMap((element) =>
    element.type === "image" && element.assetId ? [element.assetId] : []
  );

const buildVersionSummary = (
  currentSnapshot: LabelDocument,
  previousSnapshot?: LabelDocument | null
) => {
  if (!previousSnapshot) {
    return {
      sizeChanged: false,
      elementsDelta: currentSnapshot.elements.length,
      dataFieldsDelta: currentSnapshot.dataSchema.length,
      bindingsChanged: 0
    };
  }

  const currentBindings = currentSnapshot.elements.filter(
    (element) => element.type === "text" && element.contentMode === "dynamic"
  ).length;
  const previousBindings = previousSnapshot.elements.filter(
    (element) => element.type === "text" && element.contentMode === "dynamic"
  ).length;

  return {
    sizeChanged:
      currentSnapshot.document.width !== previousSnapshot.document.width ||
      currentSnapshot.document.height !== previousSnapshot.document.height ||
      currentSnapshot.document.unit !== previousSnapshot.document.unit,
    elementsDelta: currentSnapshot.elements.length - previousSnapshot.elements.length,
    dataFieldsDelta: currentSnapshot.dataSchema.length - previousSnapshot.dataSchema.length,
    bindingsChanged: currentBindings - previousBindings
  };
};

type TemplateFilters = {
  search?: string;
  status?: string;
};

const extractTemplateCategory = (metadataJson: Prisma.JsonValue | null, name: string) => {
  const rawCategory =
    metadataJson &&
    typeof metadataJson === "object" &&
    !Array.isArray(metadataJson) &&
    "category" in metadataJson
      ? metadataJson.category
      : undefined;

  if (typeof rawCategory === "string") {
    return rawCategory;
  }

  const normalizedName = name.toLowerCase();
  if (/(doce|bolo|sobremesa|confeitaria)/.test(normalizedName)) return "doces";
  if (/(salgado|lanche|snack|coxinha|empada)/.test(normalizedName)) return "salgados";
  if (/(bebida|suco|cafe|chá|cha|agua|drink)/.test(normalizedName)) return "bebidas";
  if (/(refei|almoco|almoço|jantar|marmita|prato)/.test(normalizedName)) return "refeicao";
  return "doces";
};

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
    private readonly authService: AuthService
  ) {}

  private async buildUniqueSlug(
    tenantId: string,
    name: string,
    excludeTemplateId?: string
  ) {
    const baseSlug = toSlug(name) || "template";
    let candidate = baseSlug;
    let suffix = 2;

    for (;;) {
      const existing = await this.prisma.template.findFirst({
        where: {
          tenantId,
          slug: candidate,
          ...(excludeTemplateId
            ? {
                NOT: {
                  id: excludeTemplateId
                }
              }
            : {})
        },
        select: {
          id: true
        }
      });

      if (!existing) {
        return candidate;
      }

      candidate = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
  }

  async list(tenantId: string, filters?: TemplateFilters) {
    const templates = await this.prisma.template.findMany({
      where: {
        tenantId,
        ...(filters?.status ? { status: filters.status as TemplateStatus } : {}),
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
                  slug: {
                    contains: filters.search,
                    mode: "insensitive"
                  }
                }
              ]
            }
          : {})
      },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        currentVersion: true,
        lastPublishedVersion: true,
        metadataJson: true,
        updatedAt: true,
        createdAt: true
      }
    });

    return templates.map((template) => ({
      ...template,
      category: extractTemplateCategory(template.metadataJson, template.name)
    }));
  }

  async getById(id: string, tenantId: string) {
    const template = await this.prisma.template.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { version: "desc" },
          take: 20
        },
        dataFields: true,
        assets: {
          include: {
            asset: true
          }
        },
        approvals: {
          orderBy: {
            requestedAt: "desc"
          },
          take: 10,
          include: {
            requestedBy: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            decidedBy: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            signatures: true
          }
        }
      }
    });

    if (!template || template.tenantId !== tenantId) {
      throw new NotFoundException("Template nao encontrado");
    }

    return template;
  }

  async listApprovals(id: string, tenantId: string) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId
      },
      select: {
        approvals: {
          orderBy: {
            requestedAt: "desc"
          },
          include: {
            requestedBy: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            decidedBy: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            signatures: true
          }
        }
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    return template.approvals;
  }

  async listVersions(id: string, tenantId: string) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId
      },
      select: {
        versions: {
          orderBy: { version: "desc" }
        }
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    return template.versions.map((version, index, versions) => {
      const previousVersion = versions[index + 1];
      const currentSnapshot = version.snapshotJson as unknown as LabelDocument;
      const previousSnapshot = previousVersion?.snapshotJson as LabelDocument | undefined;

      return {
        ...version,
        compareSummary: buildVersionSummary(currentSnapshot, previousSnapshot)
      };
    });
  }

  async compareVersions(id: string, version: number, againstVersion: number, tenantId: string) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId
      },
      select: {
        versions: {
          where: {
            version: {
              in: [version, againstVersion]
            }
          }
        }
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    const source = template.versions.find((entry) => entry.version === version);
    const target = template.versions.find((entry) => entry.version === againstVersion);

    if (!source || !target) {
      throw new NotFoundException("Versoes nao encontradas para comparacao");
    }

    return {
      version,
      againstVersion,
      summary: buildVersionSummary(
        source.snapshotJson as unknown as LabelDocument,
        target.snapshotJson as unknown as LabelDocument
      )
    };
  }

  async create(payload: SaveTemplateDto, session: SessionUser) {
    const templateDocument: LabelDocument = createInitialDocument({
      name: payload.name,
      status: "draft",
      document: payload.document as unknown as LabelDocumentSettings,
      elements: payload.elements as unknown as LabelElement[],
      dataSchema: payload.dataSchema as unknown as LabelDataField[],
      settings: payload.settings ?? {},
      metadata: payload.metadata ?? {}
    });
    const parsedDocument = labelDocumentSchema.parse(templateDocument);
    const imageAssetIds = collectImageAssetIds(parsedDocument);
    const slug = await this.buildUniqueSlug(session.tenantId, payload.name);

    const template = await this.prisma.template.create({
      data: {
        tenantId: session.tenantId,
        createdById: session.userId,
        updatedById: session.userId,
        name: payload.name,
        slug,
        status: TemplateStatus.DRAFT,
        currentVersion: 1,
        documentJson: toJson(parsedDocument.document),
        settingsJson: toJson(parsedDocument.settings),
        dataSchemaJson: toJson(parsedDocument.dataSchema),
        metadataJson: toJson(parsedDocument.metadata),
        dataFields: {
          create: parsedDocument.dataSchema.map(buildDataFieldRecord)
        },
        versions: {
          create: {
            version: 1,
            status: TemplateStatus.DRAFT,
            snapshotJson: toJson(parsedDocument),
            notes: payload.versionNotes ?? "Criacao inicial",
            createdById: session.userId
          }
        },
        assets: {
          create: imageAssetIds.map((assetId) => ({
            assetId,
            role: "image"
          }))
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: template.id,
      action: "template.created",
      payload: { name: payload.name, version: 1 }
    });

    return template;
  }

  async update(id: string, payload: SaveTemplateDto, session: SessionUser) {
    const current = await this.prisma.template.findUnique({
      where: { id }
    });

    if (!current || current.tenantId !== session.tenantId) {
      throw new NotFoundException("Template nao encontrado");
    }

    if (current.status !== TemplateStatus.DRAFT) {
      throw new BadRequestException(
        "Somente templates em draft podem ser editados diretamente. Crie uma nova versao para continuar."
      );
    }

    const nextVersion = current.currentVersion + 1;
    const templateDocument: LabelDocument = {
      id: current.id,
      name: payload.name,
      version: nextVersion,
      status: "draft",
      document: payload.document as unknown as LabelDocumentSettings,
      settings: payload.settings ?? {},
      dataSchema: payload.dataSchema as unknown as LabelDataField[],
      elements: payload.elements as unknown as LabelElement[],
      metadata: payload.metadata ?? {}
    };
    const parsedDocument = labelDocumentSchema.parse(templateDocument);
    const imageAssetIds = collectImageAssetIds(parsedDocument);
    const slug = await this.buildUniqueSlug(session.tenantId, payload.name, id);
    const template = await this.prisma.template.update({
      where: { id },
      data: {
        updatedById: session.userId,
        name: payload.name,
        slug,
        status: TemplateStatus.DRAFT,
        currentVersion: nextVersion,
        documentJson: toJson(parsedDocument.document),
        settingsJson: toJson(parsedDocument.settings),
        dataSchemaJson: toJson(parsedDocument.dataSchema),
        metadataJson: toJson(parsedDocument.metadata),
        dataFields: {
          deleteMany: {},
          create: parsedDocument.dataSchema.map(buildDataFieldRecord)
        },
        versions: {
          create: {
            version: nextVersion,
            status: TemplateStatus.DRAFT,
            snapshotJson: toJson(parsedDocument),
            notes: payload.versionNotes ?? "Atualizacao do template",
            createdById: session.userId
          }
        },
        assets: {
          deleteMany: {},
          create: imageAssetIds.map((assetId) => ({
            assetId,
            role: "image"
          }))
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: template.id,
      action: "template.updated",
      payload: { name: payload.name, version: nextVersion }
    });

    return template;
  }

  async createVersion(id: string, payload: CreateTemplateVersionDto, session: SessionUser) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    const sourceVersion = await this.prisma.templateVersion.findFirst({
      where: {
        templateId: id,
        version: payload.sourceVersion ?? template.currentVersion
      }
    });

    if (!sourceVersion) {
      throw new NotFoundException("Versao base nao encontrada");
    }

    const snapshot = labelDocumentSchema.parse(sourceVersion.snapshotJson as unknown as LabelDocument);
    const nextVersion = template.currentVersion + 1;
    const nextDocument = {
      ...snapshot,
      id,
      version: nextVersion,
      status: "draft" as const
    };
    const imageAssetIds = collectImageAssetIds(nextDocument);
    const slug = await this.buildUniqueSlug(session.tenantId, nextDocument.name, id);

    const updated = await this.prisma.template.update({
      where: { id },
      data: {
        updatedById: session.userId,
        status: TemplateStatus.DRAFT,
        reviewRequestedAt: null,
        approvedAt: null,
        currentVersion: nextVersion,
        name: nextDocument.name,
        slug,
        documentJson: toJson(nextDocument.document),
        settingsJson: toJson(nextDocument.settings),
        dataSchemaJson: toJson(nextDocument.dataSchema),
        metadataJson: toJson(nextDocument.metadata),
        dataFields: {
          deleteMany: {},
          create: nextDocument.dataSchema.map(buildDataFieldRecord)
        },
        versions: {
          create: {
            version: nextVersion,
            status: TemplateStatus.DRAFT,
            snapshotJson: toJson(nextDocument),
            notes: payload.notes ?? `Nova versao criada a partir da v${sourceVersion.version}`,
            createdById: session.userId
          }
        },
        assets: {
          deleteMany: {},
          create: imageAssetIds.map((assetId) => ({
            assetId,
            role: "image"
          }))
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: id,
      action: "template.version.created",
      payload: {
        sourceVersion: sourceVersion.version,
        nextVersion
      }
    });

    return updated;
  }

  async submitReview(id: string, payload: SubmitTemplateReviewDto, session: SessionUser) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    if (template.status !== TemplateStatus.DRAFT) {
      throw new BadRequestException("Apenas templates em draft podem ser enviados para revisao");
    }

    const currentVersion = await this.prisma.templateVersion.findFirst({
      where: {
        templateId: id,
        version: template.currentVersion
      }
    });

    if (!currentVersion) {
      throw new NotFoundException("Versao atual do template nao encontrada");
    }

    const now = new Date();
    const updated = await this.prisma.template.update({
      where: {
        id
      },
      data: {
        status: TemplateStatus.IN_REVIEW,
        reviewRequestedAt: now,
        approvals: {
          create: {
            templateVersionId: currentVersion.id,
            requestedById: session.userId,
            status: TemplateApprovalStatus.PENDING,
            requestNotes: payload.notes,
            requestedAt: now,
            contextJson: toJson({
              requestedVersion: currentVersion.version
            })
          }
        },
        versions: {
          updateMany: {
            where: {
              version: template.currentVersion
            },
            data: {
              status: TemplateStatus.IN_REVIEW,
              submittedAt: now,
              submittedById: session.userId,
              approvedAt: null,
              approvedById: null
            }
          }
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: id,
      action: "template.review.requested",
      payload: {
        version: template.currentVersion,
        notes: payload.notes
      }
    });

    return updated;
  }

  async decideApproval(id: string, payload: DecideTemplateApprovalDto, session: SessionUser) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    const currentVersion = await this.prisma.templateVersion.findFirst({
      where: {
        templateId: id,
        version: template.currentVersion
      }
    });

    if (!currentVersion) {
      throw new NotFoundException("Versao atual nao encontrada");
    }

    const approval = await this.prisma.templateApproval.findFirst({
      where: {
        templateId: id,
        templateVersionId: currentVersion.id,
        status: TemplateApprovalStatus.PENDING
      },
      orderBy: {
        requestedAt: "desc"
      }
    });

    if (!approval) {
      throw new BadRequestException("Nao existe aprovacao pendente para a versao atual");
    }

    const signature = await this.signCriticalAction({
      session,
      entityType: "TemplateApproval",
      entityId: approval.id,
      action:
        payload.decision === "approved"
          ? "template.approval.approved"
          : "template.approval.rejected",
      password: payload.password,
      reason: payload.notes,
      templateApprovalId: approval.id,
      context: {
        templateId: id,
        version: currentVersion.version
      }
    });

    const approved = payload.decision === "approved";
    const now = new Date();
    const updated = await this.prisma.template.update({
      where: {
        id
      },
      data: {
        status: approved ? TemplateStatus.APPROVED : TemplateStatus.DRAFT,
        reviewRequestedAt: approved ? template.reviewRequestedAt ?? now : null,
        approvedAt: approved ? now : null,
        approvals: {
          update: {
            where: {
              id: approval.id
            },
            data: {
              status: approved
                ? TemplateApprovalStatus.APPROVED
                : TemplateApprovalStatus.REJECTED,
              decisionNotes: payload.notes,
              decidedById: session.userId,
              decidedAt: now
            }
          }
        },
        versions: {
          updateMany: {
            where: {
              version: template.currentVersion
            },
            data: {
              status: approved ? TemplateStatus.APPROVED : TemplateStatus.DRAFT,
              approvedAt: approved ? now : null,
              approvedById: approved ? session.userId : null
            }
          }
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: id,
      action: approved ? "template.approved" : "template.rejected",
      payload: {
        version: template.currentVersion,
        signatureId: signature.id,
        notes: payload.notes
      }
    });

    return updated;
  }

  async publish(id: string, payload: SignatureConfirmationDto, session: SessionUser) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    if (template.status !== TemplateStatus.APPROVED) {
      throw new BadRequestException(
        "Somente templates aprovados formalmente podem ser publicados"
      );
    }

    const signature = await this.signCriticalAction({
      session,
      entityType: "Template",
      entityId: id,
      action: "template.published",
      password: payload.password,
      reason: payload.reason,
      context: {
        version: template.currentVersion
      }
    });

    const now = new Date();
    await this.prisma.templateVersion.updateMany({
      where: {
        templateId: id,
        status: TemplateStatus.PUBLISHED
      },
      data: {
        status: TemplateStatus.ARCHIVED,
        archivedAt: now
      }
    });

    await this.prisma.templateVersion.updateMany({
      where: {
        templateId: id,
        version: template.currentVersion
      },
      data: {
        status: TemplateStatus.PUBLISHED,
        publishedAt: now,
        publishedById: session.userId,
        archivedAt: null
      }
    });

    const updated = await this.prisma.template.update({
      where: { id },
      data: {
        status: TemplateStatus.PUBLISHED,
        publishedAt: now,
        lastPublishedVersion: template.currentVersion
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: id,
      action: "template.published",
      payload: { version: updated.currentVersion, signatureId: signature.id }
    });

    return updated;
  }

  async rollback(
    id: string,
    version: number,
    payload: SignatureConfirmationDto,
    session: SessionUser
  ) {
    const template = await this.prisma.template.findFirst({
      where: {
        id,
        tenantId: session.tenantId
      },
      include: {
        versions: {
          where: { version }
        }
      }
    });

    if (!template) {
      throw new NotFoundException("Template nao encontrado");
    }

    const sourceVersion = template.versions[0];
    if (!sourceVersion) {
      throw new NotFoundException("Versao nao encontrada para rollback");
    }

    const signature = await this.signCriticalAction({
      session,
      entityType: "Template",
      entityId: id,
      action: "template.rollback",
      password: payload.password,
      reason: payload.reason,
      context: {
        rollbackOfVersion: version
      }
    });

    const snapshot = sourceVersion.snapshotJson as unknown as LabelDocument;
    const nextVersion = template.currentVersion + 1;
    const rolledBackDocument = labelDocumentSchema.parse({
      ...snapshot,
      id: template.id,
      version: nextVersion,
      status: "draft"
    });
    const imageAssetIds = collectImageAssetIds(rolledBackDocument);
    const slug = await this.buildUniqueSlug(session.tenantId, rolledBackDocument.name, id);

    const updated = await this.prisma.template.update({
      where: { id },
      data: {
        updatedById: session.userId,
        name: rolledBackDocument.name,
        slug,
        status: TemplateStatus.DRAFT,
        reviewRequestedAt: null,
        approvedAt: null,
        currentVersion: nextVersion,
        documentJson: toJson(rolledBackDocument.document),
        settingsJson: toJson(rolledBackDocument.settings),
        dataSchemaJson: toJson(rolledBackDocument.dataSchema),
        metadataJson: toJson({
          ...rolledBackDocument.metadata,
          rollbackOfVersion: version
        }),
        dataFields: {
          deleteMany: {},
          create: rolledBackDocument.dataSchema.map(buildDataFieldRecord)
        },
        versions: {
          create: {
            version: nextVersion,
            status: TemplateStatus.DRAFT,
            snapshotJson: toJson(rolledBackDocument),
            notes: `Rollback da versao ${version}`,
            createdById: session.userId
          }
        },
        assets: {
          deleteMany: {},
          create: imageAssetIds.map((assetId) => ({
            assetId,
            role: "image"
          }))
        }
      }
    });

    await this.auditService.register({
      tenantId: session.tenantId,
      userId: session.userId,
      entityType: "Template",
      entityId: id,
      action: "template.rollback",
      payload: {
        fromVersion: version,
        toVersion: nextVersion,
        signatureId: signature.id
      }
    });

    return updated;
  }

  private async signCriticalAction(input: {
    session: SessionUser;
    entityType: string;
    entityId: string;
    action: string;
    password: string;
    reason?: string;
    templateApprovalId?: string;
    context?: Record<string, unknown>;
  }) {
    const isValid = await this.authService.validatePassword(
      input.session.userId,
      input.password
    );

    if (!isValid) {
      throw new UnauthorizedException("Assinatura eletronica invalida");
    }

    return this.prisma.electronicSignatureRecord.create({
      data: {
        tenantId: input.session.tenantId,
        userId: input.session.userId,
        templateApprovalId: input.templateApprovalId,
        entityType: input.entityType,
        entityId: input.entityId,
        action: input.action,
        reason: input.reason,
        contextJson: input.context ? toJson(input.context) : undefined
      }
    });
  }
}
