import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { SessionUser } from "../types/session-user";

export const CurrentSession = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SessionUser => {
    const request = context.switchToHttp().getRequest();
    return request.user as SessionUser;
  }
);

