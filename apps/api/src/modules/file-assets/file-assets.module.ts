import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { FileAssetsController } from "./file-assets.controller";
import { FileAssetsService } from "./file-assets.service";

@Module({
  imports: [AuthModule],
  controllers: [FileAssetsController],
  providers: [FileAssetsService]
})
export class FileAssetsModule {}
