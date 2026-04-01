import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type { SessionUser } from "../auth/types/session-user";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFileAssetDto } from "./dto/create-file-asset.dto";

@Injectable()
export class FileAssetsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(tenantId: string) {
    const assets = await this.prisma.fileAsset.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" }
    });

    return assets.map((asset) => ({
      ...asset,
      url: `/uploads/${asset.storageKey}`
    }));
  }

  async create(payload: CreateFileAssetDto, session: SessionUser) {
    return this.prisma.fileAsset.create({
      data: {
        tenantId: session.tenantId,
        filename: payload.filename,
        mimeType: payload.mimeType,
        storageKey: payload.storageKey,
        sizeInBytes: payload.sizeInBytes,
        metadataJson: payload.metadataJson
          ? (JSON.parse(payload.metadataJson) as Prisma.InputJsonValue)
          : undefined
      }
    });
  }

  async upload(file: Express.Multer.File, session: SessionUser) {
    const asset = await this.prisma.fileAsset.create({
      data: {
        tenantId: session.tenantId,
        filename: file.originalname,
        mimeType: file.mimetype,
        storageKey: file.filename,
        sizeInBytes: file.size,
        metadataJson: {
          uploadedBy: session.userId
        }
      }
    });

    return {
      ...asset,
      url: `/uploads/${file.filename}`
    };
  }
}
