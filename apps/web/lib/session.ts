"use client";

import { hasPermission, type PermissionKey } from "@easyprint/shared/auth/permissions";

export interface ApiSession {
  accessToken: string;
  session: {
    userId: string;
    email: string;
    name: string;
    tenantId: string;
    tenantSlug: string;
    roleKey: string;
    roleName: string;
    permissions: string[];
    authMethod?: "local" | "oidc";
    externalProviderId?: string;
    externalProviderName?: string;
  };
}

const STORAGE_KEY = "easyprint:session";

export function loadStoredSession(): ApiSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ApiSession;
  } catch {
    return null;
  }
}

export function storeSession(session: ApiSession) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function sessionHasPermission(
  session: ApiSession | null | undefined,
  permission: PermissionKey
) {
  return hasPermission(session?.session.permissions, permission);
}
