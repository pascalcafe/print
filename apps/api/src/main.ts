import { randomUUID } from "node:crypto";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { RequestLoggingInterceptor } from "./modules/observability/request-logging.interceptor";
import { runWithRequestContext } from "./modules/observability/request-context";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  app.use((request: any, response: any, next: () => void) => {
    const incomingHeader = request.headers["x-correlation-id"];
    const correlationId =
      typeof incomingHeader === "string" && incomingHeader.trim().length > 0
        ? incomingHeader
        : randomUUID();

    response.setHeader("x-correlation-id", correlationId);

    runWithRequestContext(
      {
        correlationId,
        method: request.method,
        path: request.originalUrl ?? request.url,
        startedAt: Date.now()
      },
      next
    );
  });
  app.useGlobalInterceptors(app.get(RequestLoggingInterceptor));

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}

bootstrap();
