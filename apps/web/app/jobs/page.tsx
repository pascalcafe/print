"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "@easyprint/ui";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import {
  cancelJob,
  fetchPrintJobs,
  reprintJob,
  retryJob,
  type PrintJobItem
} from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function JobsPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [jobs, setJobs] = useState<PrintJobItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const canViewJobs = sessionHasPermission(session, "print-job.view");
  const canReprintJobs = sessionHasPermission(session, "print-job.reprint");
  const canRetryJobs = sessionHasPermission(session, "print-job.retry");
  const canCancelJobs = sessionHasPermission(session, "print-job.cancel");

  const loadData = useCallback(
    async (activeSession: ApiSession) => {
      const list = await fetchPrintJobs(activeSession, {
        search: search || undefined,
        status: statusFilter === "all" ? undefined : statusFilter
      });
      setJobs(list);
    },
    [search, statusFilter]
  );

  useEffect(() => {
    if (!session || !canViewJobs) return;
    void loadData(session);
  }, [canViewJobs, loadData, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Historico de jobs"
        subtitle="Acompanhe a linha do tempo operacional, reenviar falhas, reimprimir e cancelar execucoes com mais clareza."
      >
        {!canViewJobs ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso ao historico de jobs.
          </div>
        ) : null}

        {canViewJobs ? (
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
              placeholder="Buscar por template, impressora ou id do job"
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">Todos os status</option>
              <option value="QUEUED">Queued</option>
              <option value="RUNNING">Running</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </section>
        ) : null}

        <section style={{ display: "grid", gap: 14 }}>
          {canViewJobs && jobs.length === 0 ? (
            <div className="panel" style={{ padding: 24 }}>
              Nenhum job registrado ainda.
            </div>
          ) : null}

          {canViewJobs &&
            jobs.map((job) => (
              <div key={job.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ display: "grid", gap: 8 }}>
                    <strong>{job.template.name}</strong>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <StatusBadge status={job.status}>{job.status}</StatusBadge>
                      <span className="muted" style={{ fontSize: 13 }}>
                        {job.mode} | v{job.templateVersion ?? "-"} | tentativas {job.retryCount}
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      {job.printer?.name ?? "Sem impressora"} |{" "}
                      {new Date(job.createdAt).toLocaleString("pt-BR")}
                    </div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      correlacao {job.correlationId ?? "-"} | max tentativas {job.maxAttempts ?? 3}
                      {job.nextAttemptAt
                        ? ` | proxima tentativa ${new Date(job.nextAttemptAt).toLocaleString("pt-BR")}`
                        : ""}
                    </div>
                    {job.failureReason ? (
                      <div className="muted" style={{ fontSize: 13 }}>
                        Falha: {job.failureReason}
                      </div>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "start" }}>
                    <Link href={`/jobs/${job.id}`}>Detalhes</Link>
                    {canReprintJobs ? (
                      <button
                        onClick={async () => {
                          if (!session) return;
                          await reprintJob(job.id, {}, session);
                          await loadData(session);
                        }}
                      >
                        Reimprimir
                      </button>
                    ) : null}
                    {canRetryJobs && (job.status === "FAILED" || job.status === "CANCELED") ? (
                      <button
                        onClick={async () => {
                          if (!session) return;
                          await retryJob(job.id, {}, session);
                          await loadData(session);
                        }}
                      >
                        Retry
                      </button>
                    ) : null}
                    {canCancelJobs && (job.status === "QUEUED" || job.status === "RUNNING") ? (
                      <button
                        onClick={async () => {
                          if (!session) return;
                          await cancelJob(job.id, session);
                          await loadData(session);
                        }}
                      >
                        Cancelar
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </section>
      </DashboardShell>
    </SessionGuard>
  );
}
