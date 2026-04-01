import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import type { PermissionKey } from "@easyprint/shared";
import { hasPermission } from "@easyprint/shared";
import type { SessionUser } from "../types/session-user";
import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const handlerPermissions =
      Reflect.getMetadata(PERMISSIONS_KEY, context.getHandler()) ?? [];
    const classPermissions =
      Reflect.getMetadata(PERMISSIONS_KEY, context.getClass()) ?? [];
    const requiredPermissions = [
      ...classPermissions,
      ...handlerPermissions
    ] as PermissionKey[];

    if (requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: SessionUser }>();
    const session = request.user;

    if (!session) {
      throw new ForbiddenException("Sessao ausente para verificacao de permissao");
    }

    const authorized = requiredPermissions.every((permission) =>
      hasPermission(session.permissions, permission)
    );

    if (!authorized) {
      throw new ForbiddenException("Voce nao possui permissao para esta acao");
    }

    return true;
  }
}
