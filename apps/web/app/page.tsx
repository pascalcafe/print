"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "@easyprint/ui";
import { DashboardShell } from "../components/app/dashboard-shell";
import { SessionGuard } from "../components/app/session-guard";
import { fetchTemplates, type TemplateListItem } from "../lib/api";
import { sessionHasPermission, type ApiSession } from "../lib/session";

function TemplatesPageContent() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const canViewTemplates = sessionHasPermission(session, "template.view");
  const canEditTemplates = sessionHasPermission(session, "template.edit");

  const loadTemplates = useCallback(async (activeSession: ApiSession) => {
    setLoading(true);
    try {
      const nextTemplates = await fetchTemplates(activeSession, {
        search: search || undefined,
        status: statusFilter === "all" ? undefined : statusFilter
      });
      setTemplates(nextTemplates);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    if (!session || !canViewTemplates) {
      setLoading(false);
      return;
    }
    void loadTemplates(session);
  }, [canViewTemplates, loadTemplates, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Biblioteca de Etiquetas"
        subtitle="Crie, edite, versione, visualize e prepare etiquetas com o canvas como protagonista."
        action={
          canEditTemplates ? (
            <Link
              href="/editor/new"
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 999,
                fontWeight: 600
              }}
            >
              Novo template
            </Link>
          ) : null
        }
      >
        {!canViewTemplates ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a biblioteca de templates.
          </div>
        ) : null}

        {canViewTemplates ? (
          <section
            className="panel"
            style={{
              padding: 18,
              display: "grid",
              gap: 14,
              borderRadius: 20,
              gridTemplateColumns: "minmax(0, 1fr) 180px"
            }}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou slug"
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">Todos os status</option>
              <option value="DRAFT">Draft</option>
              <option value="IN_REVIEW">In review</option>
              <option value="APPROVED">Approved</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </section>
        ) : null}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18
          }}
        >
          {canViewTemplates && loading ? (
            <div className="muted">Carregando templates...</div>
          ) : null}

          {canViewTemplates && !loading && templates.length === 0 ? (
            <div className="panel" style={{ padding: 24 }}>
              Nenhum template encontrado para este tenant.
            </div>
          ) : null}

          {canViewTemplates &&
            templates.map((template) => (
              <Link
                key={template.id}
                href={`/editor/${template.id}`}
                className="panel"
                style={{
                  padding: 20,
                  display: "grid",
                  gap: 16,
                  borderRadius: 20
                }}
              >
                <div
                  style={{
                    padding: 18,
                    minHeight: 140,
                    borderRadius: 18,
                    border: "1px solid var(--line)",
                    background:
                      "linear-gradient(135deg, rgba(15,118,110,0.08), rgba(255,255,255,0.86))"
                  }}
                >
                  <div
                    style={{
                      width: 170,
                      height: 82,
                      background: "#fff",
                      borderRadius: 12,
                      border: "1px solid rgba(15,23,42,0.08)",
                      boxShadow: "0 8px 20px rgba(15,23,42,0.06)"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontWeight: 600 }}>{template.name}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap"
                    }}
                  >
                    <span className="muted" style={{ fontSize: 14 }}>
                      v{template.currentVersion}
                    </span>
                    <StatusBadge status={template.status}>{template.status}</StatusBadge>
                    {template.lastPublishedVersion ? (
                      <span className="muted" style={{ fontSize: 12 }}>
                        publicado v{template.lastPublishedVersion}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
        </section>
      </DashboardShell>
    </SessionGuard>
  );
}

export default function HomePage() {
  return <TemplatesPageContent />;
}
