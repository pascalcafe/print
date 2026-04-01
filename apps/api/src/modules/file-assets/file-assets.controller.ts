import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { mkdirSync } from "fs";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { CurrentSession } from "../auth/decorators/current-session.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import type { SessionUser } from "../auth/types/session-user";
import { CreateFileAssetDto } from "./dto/create-file-asset.dto";
import { FileAssetsService } from "./file-assets.service";

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller("file-assets")
export class FileAssetsController {
  constructor(private readonly fileAssetsService: FileAssetsService) {}

  @Get()
  @Permissions("asset.view")
  list(@CurrentSession() session: SessionUser) {
    return this.fileAssetsService.list(session.tenantId);
  }

  @Post()
  @Permissions("asset.manage")
  create(@Body() body: CreateFileAssetDto, @CurrentSession() session: SessionUser) {
    return this.fileAssetsService.create(body, session);
  }

  @Post("upload")
  @Permissions("asset.manage")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (_request, _file, callback) => {
          const target = join(process.cwd(), "storage", "uploads");
          mkdirSync(target, { recursive: true });
          callback(null, target);
        },
        filename: (_request, file, callback) => {
          const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${suffix}${extname(file.originalname)}`);
        }
      })
    })
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentSession() session: SessionUser
  ) {
    return this.fileAssetsService.upload(file, session);
  }
}
