import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { AuthModule } from "../auth/auth.module";
import { PrintProfilesController } from "./print-profiles.controller";
import { PrintProfilesService } from "./print-profiles.service";

@Module({
  imports: [AuditModule, AuthModule],
  controllers: [PrintProfilesController],
  providers: [PrintProfilesService]
})
export class PrintProfilesModule {}
