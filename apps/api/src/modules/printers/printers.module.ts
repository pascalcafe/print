import { Module } from "@nestjs/common";
import { AuditModule } from "../audit/audit.module";
import { AuthModule } from "../auth/auth.module";
import { PrintersController } from "./printers.controller";
import { PrintersService } from "./printers.service";

@Module({
  imports: [AuditModule, AuthModule],
  controllers: [PrintersController],
  providers: [PrintersService]
})
export class PrintersModule {}
