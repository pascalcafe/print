import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable, catchError, tap, throwError } from "rxjs";
import { getCorrelationId } from "./request-context";
import { StructuredLoggerService } from "./structured-logger.service";

type HttpRequest = {
  method: string;
  url: string;
  originalUrl?: string;
  user?: {
    userId?: string;
    tenantId?: string;
  };
};

type HttpResponse = {
  statusCode: number;
};

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: StructuredLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequest>();
    const response = http.getResponse<HttpResponse>();
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.info("http.request.completed", {
          method: request.method,
          path: request.originalUrl ?? request.url,
          statusCode: response.statusCode,
          durationMs: Date.now() - startedAt,
          userId: request.user?.userId,
          tenantId: request.user?.tenantId,
          correlationId: getCorrelationId()
        });
      }),
      catchError((error: unknown) => {
        this.logger.error("http.request.failed", {
          method: request.method,
          path: request.originalUrl ?? request.url,
          statusCode: response.statusCode || 500,
          durationMs: Date.now() - startedAt,
          userId: request.user?.userId,
          tenantId: request.user?.tenantId,
          correlationId: getCorrelationId(),
          error:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message
                }
              : String(error)
        });

        return throwError(() => error);
      })
    );
  }
}
