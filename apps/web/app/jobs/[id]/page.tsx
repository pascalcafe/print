"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StatusBadge } from "@easyprint/ui";
import { DashboardShell } from "../../../components/app/dashboard-shell";
import { SessionGuard } from "../../../components/app/session-guard";
import { fetchPrintJob, type PrintJobDetail } from "../../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../../lib/session";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const [session, setSession] = useState<ApiSession | null>(null);
  const [job, setJob] = useState<PrintJobDetail | null>(null);
  const canViewJobs = sessionHasPermission(session, "print-job.view");

  useEffect(() => {
    if (!session || !canViewJobs || !params?.id) return;
    void fetchPrintJob(params.id, session).then(setJob);
  }, [canViewJobs, params?.id, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Detalhe do job"
        subtitle="Consulte payload, eventos, versao do template e contexto operacional da execucao."
        action={<Link href="/jobs">Voltar para jobs</Link>}
      >
        {!canViewJobs ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso ao detalhe de jobs.
          </div>
        ) : null}

        {canViewJobs && !job ? <div className="panel" style={{ padding: 24 }}>Carregando job...</div> : null}

        {canViewJobs && job ? (
          <section style={{ display: "grid", gap: 18 }}>
            <div className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <strong>{job.template.name}</strong>
                <StatusBadge status={job.status}>{job.status}</StatusBadge>
              </div>
              <div className="muted" style={{ fontSize: 14 }}>
                Job {job.id} | versao do template v{job.templateVersion ?? "-"} | modo {job.mode} |
                origem {job.source ?? "manual"} | {job.copies} copia{job.copies > 1 ? "s" : ""}
              </div>
              <div className="muted" style={{ fontSize: 14 }}>
                Impressora: {job.printer?.name ?? "Nao informada"} | Perfil:{" "}
                {job.printProfile?.name ?? "Nao informado"}
              </div>
              <div className="muted" style={{ fontSize: 14 }}>
                Correlacao: {job.correlationId ?? "-"} | retry {job.retryCount}/{job.maxAttempts ?? 3}
                {job.startedAt
                  ? ` | iniciado ${new Date(job.startedAt).toLocaleString("pt-BR")}`
                  : ""}
                {job.nextAttemptAt
                  ? ` | proxima tentativa ${new Date(job.nextAttemptAt).toLocaleString("pt-BR")}`
                  : ""}
              </div>
              {job.reprintOfJob ? (
                <div className="muted" style={{ fontSize: 14 }}>
                  Originado de {job.reprintOfJob.id}
                </div>
              ) : null}
            </div>

            <div style={{ display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" }}>
              <section className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
                <strong>Payload</strong>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>
                  {JSON.stringify(job.payloadJson, null, 2)}
                </pre>
              </section>

              <section className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
                <strong>Dados resolvidos</strong>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>
                  {JSON.stringify(job.resolvedDataJson ?? {}, null, 2)}
                </pre>
              </section>

              <section className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
                <strong>Resultado</strong>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>
                  {JSON.stringify(job.resultJson ?? {}, null, 2)}
                </pre>
              </section>
            </div>

            <section className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
              <strong>Linha do tempo</strong>
              {job.events.map((event) => (
                <div key={event.id} style={{ padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <strong>{event.type}</strong>
                    <span className="muted" style={{ fontSize: 12 }}>
                      {new Date(event.createdAt).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                    {event.message}
                  </div>
                </div>
              ))}
            </section>

            {job.dispatchAttempts?.length ? (
              <section className="panel" style={{ padding: 20, borderRadius: 20, display: "grid", gap: 12 }}>
                <strong>Dispatch para agente</strong>
                {job.dispatchAttempts.map((attempt) => (
                  <div key={attempt.id} style={{ padding: 12, borderRadius: 14, border: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <strong>tentativa {attempt.attemptNumber}</strong>
                      <span className="muted" style={{ fontSize: 12 }}>
                        {attempt.status}
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                      {new Date(attempt.createdAt).toLocaleString("pt-BR")}
                    </div>
                    {attempt.errorMessage ? (
                      <div className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                        {attempt.errorMessage}
                      </div>
                    ) : null}
                  </div>
                ))}
              </section>
            ) : null}
          </section>
        ) : null}
      </DashboardShell>
    </SessionGuard>
  );
}
