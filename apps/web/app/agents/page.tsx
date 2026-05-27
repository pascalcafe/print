"use client";

import { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "@easyprint/ui";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import { createAgent, fetchAgents, rotateAgentToken, type AgentNodeItem } from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function AgentsPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [agents, setAgents] = useState<AgentNodeItem[]>([]);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "Agent Sao Paulo 001",
    code: "sp-local-01",
    description: "Host local do centro de distribuicao"
  });
  const canView = sessionHasPermission(session, "agent.view");
  const canManage = sessionHasPermission(session, "agent.manage");

  const loadAgents = useCallback(async (activeSession: ApiSession) => {
    const nextAgents = await fetchAgents(activeSession);
    setAgents(nextAgents);
  }, []);

  useEffect(() => {
    if (!session || !canView) return;
    void loadAgents(session);
  }, [canView, loadAgents, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Agentes locais"
        subtitle="Gerencie os agentes oficiais do EasyPrint para cenarios hibridos de impressao."
      >
        {!canView ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso aos agentes locais.
          </div>
        ) : null}

        {canView ? (
          <section style={{ display: "grid", gap: 18, gridTemplateColumns: "360px minmax(0, 1fr)" }}>
            {canManage ? (
              <form
                className="panel"
                style={{ padding: 20, display: "grid", gap: 12, borderRadius: 20 }}
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!session) return;
                  const created = await createAgent(form, session);
                  setIssuedToken(created.token);
                  await loadAgents(session);
                }}
              >
                <strong>Novo agente</strong>
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Nome"
                />
                <input
                  value={form.code}
                  onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
                  placeholder="Codigo"
                />
                <input
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Descricao"
                />
                <button type="submit">Registrar agente</button>
                {issuedToken ? (
                  <div className="muted" style={{ fontSize: 12, wordBreak: "break-all" }}>
                    Token emitido agora: {issuedToken}
                  </div>
                ) : null}
              </form>
            ) : (
              <div className="panel" style={{ padding: 20, borderRadius: 20 }}>
                Seu papel pode consultar agentes, mas nao registrar novos.
              </div>
            )}

            <div style={{ display: "grid", gap: 14 }}>
              {agents.length === 0 ? (
                <div className="panel" style={{ padding: 24 }}>
                  Nenhum agente local registrado ainda.
                </div>
              ) : null}

              {agents.map((agent) => (
                <div key={agent.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <strong>{agent.name}</strong>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <StatusBadge status={agent.status}>{agent.status}</StatusBadge>
                        <span className="muted" style={{ fontSize: 13 }}>
                          {agent.code} | ultima atividade{" "}
                          {agent.lastSeenAt
                            ? new Date(agent.lastSeenAt).toLocaleString("pt-BR")
                            : "ainda sem heartbeat"}
                        </span>
                      </div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        Impressoras vinculadas: {agent.printers.length}
                      </div>
                    </div>

                    {canManage ? (
                      <button
                        onClick={async () => {
                          if (!session) return;
                          const rotated = await rotateAgentToken(agent.id, session);
                          setIssuedToken(rotated.token);
                        }}
                      >
                        Rotacionar token
                      </button>
                    ) : null}
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
