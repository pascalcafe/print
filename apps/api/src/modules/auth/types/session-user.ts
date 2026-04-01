export interface SessionUser {
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
}
