"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import { fetchMetrics, type MetricsSnapshot } from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function ObservabilityPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const canView = sessionHasPermission(session, "observability.view");

  const loadMetrics = useCallback(async (activeSession: ApiSession) => {
    const nextMetrics = await fetchMetrics(activeSession);
    setMetrics(nextMetrics);
  }, []);

  useEffect(() => {
    if (!session || !canView) return;
    void loadMetrics(session);
  }, [canView, loadMetrics, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Observabilidade"
        subtitle="Acompanhe a saude operacional, gargalos e sinais principais do tenant em um ponto unico."
      >
        {!canView ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a observabilidade.
          </div>
        ) : null}

        {canView && metrics ? (
          <section style={{ display: "grid", gap: 16 }}>
            <div
              style={{
                display: "grid",
                gap: 14,
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
              }}
            >
              {[
                ["Impressoras ativas", metrics.activePrinters],
                ["Agentes online", metrics.onlineAgents],
                ["Aprovacoes pendentes", metrics.pendingApprovals],
                ["Falhas recentes", metrics.recentFailures]
              ].map(([label, value]) => (
                <div key={label} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
                    {label}
                  </div>
                  <strong style={{ fontSize: 28 }}>{value}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "1fr 1fr" }}>
              <div className="panel" style={{ padding: 18, borderRadius: 18, display: "grid", gap: 10 }}>
                <strong>Templates por status</strong>
                {Object.entries(metrics.templatesByStatus).map(([status, count]) => (
                  <div key={status} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span className="muted">{status}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>

              <div className="panel" style={{ padding: 18, borderRadius: 18, display: "grid", gap: 10 }}>
                <strong>Jobs por status</strong>
                {Object.entries(metrics.jobsByStatus).map(([status, count]) => (
                  <div key={status} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span className="muted">{status}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </DashboardShell>
    </SessionGuard>
  );
}
