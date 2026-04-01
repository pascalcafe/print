import { Global, Module } from "@nestjs/common";
import { ObservabilityController } from "./observability.controller";
import { ObservabilityService } from "./observability.service";
import { RequestLoggingInterceptor } from "./request-logging.interceptor";
import { StructuredLoggerService } from "./structured-logger.service";

@Global()
@Module({
  controllers: [ObservabilityController],
  providers: [ObservabilityService, StructuredLoggerService, RequestLoggingInterceptor],
  exports: [ObservabilityService, StructuredLoggerService, RequestLoggingInterceptor]
})
export class ObservabilityModule {}
