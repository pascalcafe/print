import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { AuthModule } from "../auth/auth.module";
import { PrintJobsController } from "./print-jobs.controller";
import { PrintJobsService } from "./print-jobs.service";

@Module({
  imports: [AuditModule, AuthModule],
  controllers: [PrintJobsController],
  providers: [PrintJobsService]
})
export class PrintJobsModule {}
