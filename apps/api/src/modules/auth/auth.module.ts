import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthBootstrapService } from "./bootstrap.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET", "easyprint-dev-secret"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN", "8h")
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthBootstrapService,
    JwtStrategy,
    JwtAuthGuard,
    PermissionsGuard
  ],
  exports: [AuthService, JwtAuthGuard, PermissionsGuard]
})
export class AuthModule {}
