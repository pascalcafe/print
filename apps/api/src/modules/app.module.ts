import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AgentsModule } from "./agents/agents.module";
import { AppController } from "./app.controller";
import { AuditModule } from "./audit/audit.module";
import { AuthModule } from "./auth/auth.module";
import { FileAssetsModule } from "./file-assets/file-assets.module";
import { IdentityModule } from "./identity/identity.module";
import { ObservabilityModule } from "./observability/observability.module";
import { PrintersModule } from "./printers/printers.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PrintProfilesModule } from "./print-profiles/print-profiles.module";
import { TemplatesModule } from "./templates/templates.module";
import { PrintJobsModule } from "./print-jobs/print-jobs.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "storage", "uploads"),
      serveRoot: "/uploads"
    }),
    PrismaModule,
    ObservabilityModule,
    AuthModule,
    AgentsModule,
    IdentityModule,
    AuditModule,
    TemplatesModule,
    PrintersModule,
    PrintProfilesModule,
    FileAssetsModule,
    PrintJobsModule
  ],
  controllers: [AppController]
})
export class AppModule {}
