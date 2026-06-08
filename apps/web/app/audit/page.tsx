"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import { fetchAuditLog } from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function AuditPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState("");
  const canViewAudit = sessionHasPermission(session, "audit.view");

  const loadData = useCallback(
    async (activeSession: ApiSession) => {
      const list = await fetchAuditLog(activeSession, {
        search: search || undefined,
        entityType: entityType || undefined
      });
      setEntries(list);
    },
    [entityType, search]
  );

  useEffect(() => {
    if (!session || !canViewAudit) return;
    void loadData(session);
  }, [canViewAudit, loadData, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Auditoria"
        subtitle="Trilha operacional mais forte para versoes, impressao, rollback e alteracoes criticas."
      >
        {!canViewAudit ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a auditoria.
          </div>
        ) : null}

        {canViewAudit ? (
          <section
            className="panel"
            style={{
              padding: 18,
              display: "grid",
              gap: 14,
              borderRadius: 20,
              gridTemplateColumns: "minmax(0, 1fr) 220px"
            }}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por acao ou id da entidade"
            />
            <input
              value={entityType}
              onChange={(event) => setEntityType(event.target.value)}
              placeholder="Filtrar por entidade"
            />
          </section>
        ) : null}

        <section style={{ display: "grid", gap: 14 }}>
          {canViewAudit &&
            entries.map((entry) => (
              <div key={entry.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <strong>{entry.action}</strong>
                  <span className="muted" style={{ fontSize: 12 }}>
                    {new Date(entry.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="muted" style={{ marginTop: 8 }}>
                  {entry.entityType} | {entry.entityId}
                </div>
              </div>
            ))}
        </section>
      </DashboardShell>
    </SessionGuard>
  );
}
