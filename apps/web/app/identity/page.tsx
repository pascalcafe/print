"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import {
  createIdentityProvider,
  fetchIdentityProviders,
  type IdentityProviderItem
} from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function IdentityPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [providers, setProviders] = useState<IdentityProviderItem[]>([]);
  const [form, setForm] = useState({
    name: "Azure AD Corporativo",
    slug: "corporate-oidc",
    type: "OIDC" as const,
    issuerUrl: "https://login.microsoftonline.com/tenant-id/v2.0",
    clientId: "",
    clientSecret: "",
    scopes: "openid profile email",
    autoProvisionUsers: false,
    autoLinkByEmail: true
  });
  const canView = sessionHasPermission(session, "identity.view");
  const canManage = sessionHasPermission(session, "identity.manage");

  const loadProviders = useCallback(async (activeSession: ApiSession) => {
    const nextProviders = await fetchIdentityProviders(activeSession);
    setProviders(nextProviders);
  }, []);

  useEffect(() => {
    if (!session || !canView) return;
    void loadProviders(session);
  }, [canView, loadProviders, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Identidade corporativa"
        subtitle="Configure providers OIDC por tenant sem quebrar o RBAC interno do EasyPrint."
      >
        {!canView ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a identidade corporativa.
          </div>
        ) : null}

        {canView ? (
          <section style={{ display: "grid", gap: 18, gridTemplateColumns: "380px minmax(0, 1fr)" }}>
            {canManage ? (
              <form
                className="panel"
                style={{ padding: 20, display: "grid", gap: 12, borderRadius: 20 }}
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!session) return;
                  await createIdentityProvider(
                    {
                      ...form,
                      scopes: form.scopes.split(" ").filter(Boolean)
                    },
                    session
                  );
                  await loadProviders(session);
                }}
              >
                <strong>Novo provider corporativo</strong>
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Nome"
                />
                <input
                  value={form.slug}
                  onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                  placeholder="Slug"
                />
                <input
                  value={form.issuerUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, issuerUrl: event.target.value }))
                  }
                  placeholder="Issuer URL"
                />
                <input
                  value={form.clientId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, clientId: event.target.value }))
                  }
                  placeholder="Client ID"
                />
                <input
                  type="password"
                  value={form.clientSecret}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, clientSecret: event.target.value }))
                  }
                  placeholder="Client Secret"
                />
                <input
                  value={form.scopes}
                  onChange={(event) => setForm((prev) => ({ ...prev, scopes: event.target.value }))}
                  placeholder="Scopes separados por espaco"
                />
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={form.autoLinkByEmail}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, autoLinkByEmail: event.target.checked }))
                    }
                  />
                  Vincular por e-mail automaticamente
                </label>
                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={form.autoProvisionUsers}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, autoProvisionUsers: event.target.checked }))
                    }
                  />
                  Provisionar usuario automaticamente
                </label>
                <button type="submit">Salvar provider</button>
              </form>
            ) : (
              <div className="panel" style={{ padding: 20, borderRadius: 20 }}>
                Seu papel pode consultar providers, mas nao cadastrar novos.
              </div>
            )}

            <div style={{ display: "grid", gap: 14 }}>
              {providers.length === 0 ? (
                <div className="panel" style={{ padding: 24 }}>
                  Nenhum provider corporativo cadastrado neste tenant.
                </div>
              ) : null}

              {providers.map((provider) => (
                <div key={provider.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <strong>{provider.name}</strong>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {provider.slug} | {provider.type} | {provider.issuerUrl}
                    </div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      auto link {provider.autoLinkByEmail ? "sim" : "nao"} | auto provision{" "}
                      {provider.autoProvisionUsers ? "sim" : "nao"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </DashboardShell>
    </SessionGuard>
  );
}
