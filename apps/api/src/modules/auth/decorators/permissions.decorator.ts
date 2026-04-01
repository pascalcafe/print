import { SetMetadata } from "@nestjs/common";
import type { PermissionKey } from "@easyprint/shared";

export const PERMISSIONS_KEY = "easyprint:permissions";

export const Permissions = (...permissions: PermissionKey[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
