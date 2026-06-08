import { Injectable } from "@nestjs/common";
import { getCorrelationId } from "./request-context";

type LogLevel = "info" | "warn" | "error";

@Injectable()
export class StructuredLoggerService {
  private emit(level: LogLevel, event: string, payload?: Record<string, unknown>) {
    const entry = {
      level,
      event,
      timestamp: new Date().toISOString(),
      correlationId: getCorrelationId(),
      ...(payload ?? {})
    };

    const line = JSON.stringify(entry);
    if (level === "error") {
      console.error(line);
      return;
    }

    if (level === "warn") {
      console.warn(line);
      return;
    }

    console.log(line);
  }

  info(event: string, payload?: Record<string, unknown>) {
    this.emit("info", event, payload);
  }

  warn(event: string, payload?: Record<string, unknown>) {
    this.emit("warn", event, payload);
  }

  error(event: string, payload?: Record<string, unknown>) {
    this.emit("error", event, payload);
  }
}
