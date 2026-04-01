import { createInitialDocument } from "@easyprint/shared/template/factories";
import type { LabelDocument } from "@easyprint/shared/template/document";
import type { ApiSession } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export interface TemplateListItem {
  id: string;
  name: string;
  status: string;
  currentVersion: number;
  lastPublishedVersion?: number | null;
  updatedAt: string;
}

export interface TemplateVersionItem {
  id: string;
  version: number;
  status: string;
  notes?: string | null;
  createdAt: string;
  publishedAt?: string | null;
  archivedAt?: string | null;
  compareSummary?: {
    sizeChanged: boolean;
    elementsDelta: number;
    dataFieldsDelta: number;
    bindingsChanged: number;
  };
}

export interface TemplateApprovalItem {
  id: string;
  status: string;
  requestNotes?: string | null;
  decisionNotes?: string | null;
  requestedAt: string;
  decidedAt?: string | null;
  requestedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  decidedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  signatures?: Array<{
    id: string;
    action: string;
    reason?: string | null;
    verifiedAt: string;
  }>;
}

export interface PublicIdentityProviderItem {
  name: string;
  slug: string;
  type: string;
}

export interface IdentityProviderItem {
  id: string;
  name: string;
  slug: string;
  type: string;
  issuerUrl: string;
  enabled: boolean;
  autoProvisionUsers: boolean;
  autoLinkByEmail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AgentNodeItem {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  status: string;
  version?: string | null;
  lastSeenAt?: string | null;
  printers: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  heartbeats: Array<{
    id: string;
    status: string;
    version?: string | null;
    hostname?: string | null;
    createdAt: string;
  }>;
}

export interface MetricsSnapshot {
  timestamp: string;
  templatesByStatus: Record<string, number>;
  jobsByStatus: Record<string, number>;
  activePrinters: number;
  onlineAgents: number;
  pendingApprovals: number;
  recentFailures: number;
}

export interface PrinterItem {
  id: string;
  name: string;
  code: string;
  dpi: number;
  connectionType: string;
  manufacturer?: string | null;
  model?: string | null;
  isActive: boolean;
  agentNodeId?: string | null;
  agentNode?: {
    id: string;
    name: string;
    code: string;
    lastSeenAt?: string | null;
  } | null;
}

export interface PrintProfileItem {
  id: string;
  name: string;
  printerId: string;
  copiesDefault: number;
  mediaType?: string | null;
  printer?: PrinterItem;
}

export interface PrintJobItem {
  id: string;
  status: string;
  mode: string;
  templateVersion?: number | null;
  retryCount: number;
  maxAttempts?: number;
  correlationId?: string | null;
  nextAttemptAt?: string | null;
  reprintOfJobId?: string | null;
  failureReason?: string | null;
  createdAt: string;
  completedAt?: string | null;
  template: {
    id: string;
    name: string;
  };
  printer?: {
    id: string;
    name: string;
  } | null;
  printProfile?: {
    id: string;
    name: string;
  } | null;
  events?: Array<{
    id: string;
    type: string;
    message: string;
    createdAt: string;
  }>;
  dispatchAttempts?: Array<{
    id: string;
    status: string;
    attemptNumber: number;
    createdAt: string;
  }>;
}

export interface PrintJobDetail extends PrintJobItem {
  payloadJson: Record<string, unknown>;
  resultJson?: Record<string, unknown> | null;
  canceledAt?: string | null;
  requestedBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  canceledBy?: {
    id: string;
    name: string;
    email: string;
  } | null;
  reprintOfJob?: {
    id: string;
    status: string;
    createdAt: string;
  } | null;
  events: Array<{
    id: string;
    type: string;
    message: string;
    payloadJson?: Record<string, unknown> | null;
    createdAt: string;
  }>;
  dispatchAttempts?: Array<{
    id: string;
    status: string;
    attemptNumber: number;
    errorMessage?: string | null;
    createdAt: string;
    completedAt?: string | null;
  }>;
}

const withQuery = (path: string, query?: Record<string, string | undefined | null>) => {
  if (!query) {
    return path;
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) {
      params.set(key, value);
    }
  }

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};

async function apiFetch<T>(path: string, session: ApiSession, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Falha no login");
  }

  return response.json() as Promise<ApiSession>;
}

export async function fetchSsoProviders(tenantSlug: string) {
  const response = await fetch(
    `${API_URL}/identity/public/providers?tenantSlug=${encodeURIComponent(tenantSlug)}`
  );

  if (!response.ok) {
    throw new Error("Falha ao carregar providers corporativos");
  }

  return response.json() as Promise<PublicIdentityProviderItem[]>;
}

export async function startOidcLogin(
  providerSlug: string,
  payload: { tenantSlug: string; redirectUri: string }
) {
  const response = await fetch(`${API_URL}/identity/public/oidc/${providerSlug}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Falha ao iniciar autenticacao corporativa");
  }

  return response.json() as Promise<{
    authorizationUrl: string;
    provider: PublicIdentityProviderItem;
  }>;
}

export async function exchangeOidcLogin(
  providerSlug: string,
  payload: { state: string; code: string; redirectUri: string }
) {
  const response = await fetch(`${API_URL}/identity/public/oidc/${providerSlug}/exchange`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Falha ao concluir autenticacao corporativa");
  }

  return response.json() as Promise<ApiSession>;
}

export async function fetchMe(session: ApiSession) {
  return apiFetch<ApiSession["session"]>("/auth/me", session);
}

export async function fetchTemplates(
  session: ApiSession,
  filters?: { search?: string; status?: string }
): Promise<TemplateListItem[]> {
  return apiFetch(withQuery("/templates", filters), session);
}

export async function fetchTemplateDocument(
  id: string,
  session: ApiSession
): Promise<LabelDocument> {
  if (id === "new") {
    return createInitialDocument();
  }

  const template = await apiFetch<any>(`/templates/${id}`, session);
  const latestSnapshot = template.versions?.[0]?.snapshotJson;

  return createInitialDocument({
    id: template.id,
    name: template.name,
    version: template.currentVersion,
    status: String(template.status).toLowerCase() as LabelDocument["status"],
    document: latestSnapshot?.document ?? template.documentJson,
    settings: latestSnapshot?.settings ?? template.settingsJson ?? {},
    dataSchema:
      latestSnapshot?.dataSchema ??
      template.dataSchemaJson ??
      template.dataFields?.map((field: any) => ({
        key: field.key,
        label: field.label,
        type: field.type,
        required: field.required,
        description: field.description,
        sampleValue: field.sampleValue,
        fallbackValue: field.fallbackValue,
        formatType: field.formatType,
        formatConfig: field.formatConfigJson ?? {}
      })) ??
      [],
    metadata: latestSnapshot?.metadata ?? template.metadataJson ?? {},
    elements: latestSnapshot?.elements ?? []
  });
}

export async function fetchTemplateVersions(id: string, session: ApiSession) {
  return apiFetch<TemplateVersionItem[]>(`/templates/${id}/versions`, session);
}

export async function fetchTemplateApprovals(id: string, session: ApiSession) {
  return apiFetch<TemplateApprovalItem[]>(`/templates/${id}/approvals`, session);
}

export async function saveTemplate(
  document: LabelDocument,
  session: ApiSession,
  options?: { versionNotes?: string }
) {
  const payload = {
    name: document.name,
    status: document.status,
    document: document.document,
    elements: document.elements,
    dataSchema: document.dataSchema,
    settings: document.settings,
    metadata: document.metadata,
    versionNotes: options?.versionNotes ?? "Salvo pelo editor web"
  };

  const isNew = document.id === "template-new";
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
    lastPublishedVersion?: number | null;
  }>(isNew ? "/templates" : `/templates/${document.id}`, session, {
    method: isNew ? "POST" : "PUT",
    body: JSON.stringify(payload)
  });
}

export async function submitTemplateReview(
  id: string,
  payload: { notes?: string },
  session: ApiSession
) {
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
  }>(`/templates/${id}/review`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function decideTemplateApproval(
  id: string,
  payload: { decision: "approved" | "rejected"; password: string; notes?: string },
  session: ApiSession
) {
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
  }>(`/templates/${id}/approval`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function publishTemplate(
  id: string,
  session: ApiSession,
  payload?: { password: string; reason?: string }
) {
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
    lastPublishedVersion?: number | null;
  }>(`/templates/${id}/publish`, session, {
    method: "POST",
    body: JSON.stringify(payload ?? {})
  });
}

export async function createTemplateVersion(
  id: string,
  payload: { notes?: string; sourceVersion?: number },
  session: ApiSession
) {
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
  }>(`/templates/${id}/versions`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function compareTemplateVersions(
  id: string,
  version: number,
  againstVersion: number,
  session: ApiSession
) {
  return apiFetch<{
    version: number;
    againstVersion: number;
    summary: TemplateVersionItem["compareSummary"];
  }>(`/templates/${id}/versions/${version}/compare/${againstVersion}`, session);
}

export async function rollbackTemplateVersion(
  id: string,
  version: number,
  payload: { password: string; reason?: string },
  session: ApiSession
) {
  return apiFetch<{
    id: string;
    status: string;
    currentVersion: number;
  }>(`/templates/${id}/versions/${version}/rollback`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchIdentityProviders(session: ApiSession) {
  return apiFetch<IdentityProviderItem[]>("/identity/providers", session);
}

export async function createIdentityProvider(
  payload: {
    name: string;
    slug: string;
    type: "OIDC" | "SAML";
    issuerUrl: string;
    clientId: string;
    clientSecret?: string;
    authorizationUrl?: string;
    tokenUrl?: string;
    userInfoUrl?: string;
    scopes?: string[];
    claimMapping?: Record<string, string>;
    autoProvisionUsers?: boolean;
    autoLinkByEmail?: boolean;
  },
  session: ApiSession
) {
  return apiFetch("/identity/providers", session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchAgents(session: ApiSession) {
  return apiFetch<AgentNodeItem[]>("/agents", session);
}

export async function createAgent(
  payload: {
    name: string;
    code: string;
    description?: string;
    metadata?: Record<string, unknown>;
  },
  session: ApiSession
) {
  return apiFetch<AgentNodeItem & { token: string }>("/agents", session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function rotateAgentToken(id: string, session: ApiSession) {
  return apiFetch<AgentNodeItem & { token: string }>(`/agents/${id}/rotate-token`, session, {
    method: "POST"
  });
}

export async function fetchPrinters(
  session: ApiSession,
  filters?: { search?: string; active?: string }
): Promise<PrinterItem[]> {
  return apiFetch(withQuery("/printers", filters), session);
}

export async function createPrinter(
  payload: Omit<PrinterItem, "id" | "isActive" | "agentNode"> & {
    manufacturer?: string;
    model?: string;
  },
  session: ApiSession
) {
  return apiFetch("/printers", session, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      isActive: true
    })
  });
}

export async function assignPrinterAgent(
  id: string,
  agentNodeId: string | undefined,
  session: ApiSession
) {
  return apiFetch(`/printers/${id}/agent`, session, {
    method: "POST",
    body: JSON.stringify({ agentNodeId })
  });
}

export async function updatePrinterStatus(
  id: string,
  isActive: boolean,
  session: ApiSession
) {
  return apiFetch(`/printers/${id}/status`, session, {
    method: "POST",
    body: JSON.stringify({ isActive })
  });
}

export async function fetchPrintJobs(
  session: ApiSession,
  filters?: { search?: string; status?: string }
): Promise<PrintJobItem[]> {
  return apiFetch(withQuery("/print-jobs", filters), session);
}

export async function fetchPrintJob(id: string, session: ApiSession): Promise<PrintJobDetail> {
  return apiFetch(`/print-jobs/${id}`, session);
}

export async function fetchPrintProfiles(session: ApiSession): Promise<PrintProfileItem[]> {
  return apiFetch("/print-profiles", session);
}

export async function createPrintProfile(
  payload: {
    printerId: string;
    name: string;
    mediaType?: string;
    darkness?: number;
    speed?: number;
    copiesDefault?: number;
  },
  session: ApiSession
) {
  return apiFetch("/print-profiles", session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function createPrintJob(
  payload: {
    templateId: string;
    printerId?: string;
    printProfileId?: string;
    mode?: string;
    idempotencyKey?: string;
    maxAttempts?: number;
    payload: Record<string, unknown>;
  },
  session: ApiSession
) {
  return apiFetch("/print-jobs", session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function createTestPrintJob(
  payload: {
    templateId: string;
    printerId?: string;
    printProfileId?: string;
    idempotencyKey?: string;
    maxAttempts?: number;
    payload: Record<string, unknown>;
  },
  session: ApiSession
) {
  return apiFetch("/print-jobs/test", session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function reprintJob(
  id: string,
  payload: {
    printerId?: string;
    printProfileId?: string;
    idempotencyKey?: string;
    payload?: Record<string, unknown>;
  },
  session: ApiSession
) {
  return apiFetch(`/print-jobs/${id}/reprint`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function retryJob(
  id: string,
  payload: {
    printerId?: string;
    printProfileId?: string;
    idempotencyKey?: string;
    payload?: Record<string, unknown>;
  },
  session: ApiSession
) {
  return apiFetch(`/print-jobs/${id}/retry`, session, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function cancelJob(id: string, session: ApiSession) {
  return apiFetch(`/print-jobs/${id}/cancel`, session, {
    method: "POST"
  });
}

export async function fetchAssets(session: ApiSession) {
  return apiFetch<any[]>("/file-assets", session);
}

export async function uploadAsset(file: File, session: ApiSession) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/file-assets/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar asset");
  }

  return response.json() as Promise<{
    id: string;
    url: string;
    filename: string;
  }>;
}

export async function fetchAuditLog(
  session: ApiSession,
  filters?: { action?: string; entityType?: string; search?: string }
) {
  return apiFetch<any[]>(withQuery("/audit", filters), session);
}

export async function fetchMetrics(session: ApiSession) {
  return apiFetch<MetricsSnapshot>("/observability/metrics", session);
}
