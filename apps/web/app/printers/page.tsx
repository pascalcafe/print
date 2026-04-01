"use client";

import { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "@easyprint/ui";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import {
  assignPrinterAgent,
  createPrinter,
  fetchAgents,
  fetchPrinters,
  type AgentNodeItem,
  type PrinterItem,
  updatePrinterStatus
} from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function PrintersPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [printers, setPrinters] = useState<PrinterItem[]>([]);
  const [agents, setAgents] = useState<AgentNodeItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [form, setForm] = useState({
    name: "Zebra ZD220",
    code: "zebra-zd220",
    dpi: 203,
    connectionType: "network",
    manufacturer: "Zebra",
    model: "ZD220",
    agentNodeId: ""
  });
  const canViewPrinters = sessionHasPermission(session, "printer.view");
  const canManagePrinters = sessionHasPermission(session, "printer.manage");

  const loadData = useCallback(
    async (activeSession: ApiSession) => {
      const [list, nextAgents] = await Promise.all([
        fetchPrinters(activeSession, {
          search: search || undefined,
          active: activeFilter === "all" ? undefined : activeFilter
        }),
        fetchAgents(activeSession)
      ]);
      setPrinters(list);
      setAgents(nextAgents);
    },
    [activeFilter, search]
  );

  useEffect(() => {
    if (!session || !canViewPrinters) return;
    void loadData(session);
  }, [canViewPrinters, loadData, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Impressoras"
        subtitle="Cadastre, filtre e acompanhe a disponibilidade operacional das impressoras do tenant."
      >
        {!canViewPrinters ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a impressoras.
          </div>
        ) : null}

        {canViewPrinters ? (
          <section
            className="panel"
            style={{
              padding: 18,
              display: "grid",
              gap: 14,
              borderRadius: 20,
              gridTemplateColumns: "minmax(0, 1fr) 200px"
            }}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou codigo"
            />
            <select value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
              <option value="all">Todas</option>
              <option value="true">Ativas</option>
              <option value="false">Inativas</option>
            </select>
          </section>
        ) : null}

        <section style={{ display: "grid", gap: 18, gridTemplateColumns: "360px minmax(0, 1fr)" }}>
          {canManagePrinters ? (
            <form
              className="panel"
              style={{ padding: 20, display: "grid", gap: 12, borderRadius: 20 }}
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!session) return;
                  await createPrinter(
                    {
                      ...form,
                      agentNodeId: form.agentNodeId || undefined
                    },
                    session
                  );
                  await loadData(session);
                }}
              >
              <strong>Nova impressora</strong>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                value={form.code}
                onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
              />
              <input
                type="number"
                value={form.dpi}
                onChange={(event) => setForm((prev) => ({ ...prev, dpi: Number(event.target.value) }))}
              />
              <input
                value={form.connectionType}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, connectionType: event.target.value }))
                }
              />
              <select
                value={form.agentNodeId}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, agentNodeId: event.target.value }))
                }
              >
                <option value="">Sem agente local</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} ({agent.code})
                  </option>
                ))}
              </select>
              <button type="submit">Salvar impressora</button>
            </form>
          ) : (
            <div className="panel" style={{ padding: 20, borderRadius: 20 }}>
              Seu papel pode consultar impressoras, mas nao cadastrar novas.
            </div>
          )}

          <div style={{ display: "grid", gap: 14 }}>
            {canViewPrinters &&
              printers.map((printer) => (
                <div key={printer.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <strong>{printer.name}</strong>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <StatusBadge status={printer.isActive ? "ACTIVE" : "INACTIVE"}>
                          {printer.isActive ? "ACTIVE" : "INACTIVE"}
                        </StatusBadge>
                        <span className="muted" style={{ fontSize: 13 }}>
                          {printer.code} | {printer.connectionType} | {printer.dpi} dpi
                        </span>
                      </div>
                      <div className="muted" style={{ fontSize: 13 }}>
                        Agente local: {printer.agentNode?.name ?? "nao vinculado"}
                      </div>
                    </div>

                    {canManagePrinters ? (
                      <div style={{ display: "grid", gap: 8 }}>
                        <button
                          onClick={async () => {
                            if (!session) return;
                            await updatePrinterStatus(printer.id, !printer.isActive, session);
                            await loadData(session);
                          }}
                        >
                          {printer.isActive ? "Desativar" : "Ativar"}
                        </button>
                        <select
                          value={printer.agentNodeId ?? ""}
                          onChange={async (event) => {
                            if (!session) return;
                            await assignPrinterAgent(
                              printer.id,
                              event.target.value || undefined,
                              session
                            );
                            await loadData(session);
                          }}
                        >
                          <option value="">Sem agente local</option>
                          {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name} ({agent.code})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </DashboardShell>
    </SessionGuard>
  );
}
