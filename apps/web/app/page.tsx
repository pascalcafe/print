"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardShell } from "../components/app/dashboard-shell";
import { SessionGuard } from "../components/app/session-guard";
import { TemplateModelCard } from "../components/templates/template-model-card";
import { TemplatePrintModal } from "../components/templates/template-print-modal";
import {
  fetchPrintProfiles,
  fetchPrinters,
  fetchTemplates,
  type PrintProfileItem,
  type PrinterItem,
  type TemplateListItem
} from "../lib/api";
import { sessionHasPermission, type ApiSession } from "../lib/session";
import {
  getCategoryDefinition,
  inferTemplateCategory,
  MODEL_CATEGORIES,
  type ModelCategory
} from "../lib/template-library";

type CategoryFilter = "all" | ModelCategory;

function TemplatesPageContent() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [printers, setPrinters] = useState<PrinterItem[]>([]);
  const [profiles, setProfiles] = useState<PrintProfileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateListItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const canViewTemplates = sessionHasPermission(session, "template.view");
  const canEditTemplates = sessionHasPermission(session, "template.edit");
  const canPrintTemplates = sessionHasPermission(session, "print-job.test");

  const loadTemplates = useCallback(
    async (activeSession: ApiSession) => {
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
    },
    [search, statusFilter]
  );

  useEffect(() => {
    if (!session || !canViewTemplates) {
      setLoading(false);
      return;
    }

    void loadTemplates(session);
  }, [canViewTemplates, loadTemplates, session]);

  useEffect(() => {
    if (!session || !canPrintTemplates) {
      setPrinters([]);
      setProfiles([]);
      return;
    }

    let active = true;
    setRouteLoading(true);

    void Promise.all([
      fetchPrinters(session, { active: "true" }),
      fetchPrintProfiles(session)
    ])
      .then(([nextPrinters, nextProfiles]) => {
        if (!active) return;
        setPrinters(nextPrinters);
        setProfiles(nextProfiles);
      })
      .finally(() => {
        if (!active) return;
        setRouteLoading(false);
      });

    return () => {
      active = false;
    };
  }, [canPrintTemplates, session]);

  const templatesWithCategory = useMemo(
    () =>
      templates.map((template) => ({
        ...template,
        resolvedCategory: inferTemplateCategory(template)
      })),
    [templates]
  );

  const categoryCounts = useMemo(() => {
    const counts = MODEL_CATEGORIES.reduce<Record<ModelCategory, number>>(
      (accumulator, category) => ({
        ...accumulator,
        [category]: 0
      }),
      {
        doces: 0,
        salgados: 0,
        bebidas: 0,
        refeicao: 0
      }
    );

    templatesWithCategory.forEach((template) => {
      counts[template.resolvedCategory] += 1;
    });

    return counts;
  }, [templatesWithCategory]);

  const visibleTemplates = useMemo(
    () =>
      templatesWithCategory.filter((template) =>
        categoryFilter === "all" ? true : template.resolvedCategory === categoryFilter
      ),
    [categoryFilter, templatesWithCategory]
  );

  const selectedCategory =
    selectedTemplate ? inferTemplateCategory(selectedTemplate) : null;

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Biblioteca de Modelos"
        subtitle="Organize modelos por categoria, abra rapidamente o fluxo operacional e mantenha o editor visual como origem da verdade."
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

        {feedback ? (
          <section
            className="panel"
            style={{
              padding: 16,
              borderRadius: 18,
              background: "rgba(15, 118, 110, 0.08)",
              border: "1px solid rgba(15, 118, 110, 0.18)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>{feedback}</div>
              <button type="button" onClick={() => setFeedback(null)}>
                Fechar
              </button>
            </div>
          </section>
        ) : null}

        {canViewTemplates ? (
          <>
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

            <section
              className="panel"
              style={{
                padding: 18,
                borderRadius: 20,
                display: "grid",
                gap: 16
              }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <strong>Modelos por categoria</strong>
                <div className="muted" style={{ fontSize: 13 }}>
                  Selecione uma categoria para reduzir o ruído visual e operar mais rápido no dia a dia.
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  style={{
                    background: categoryFilter === "all" ? "var(--primary-soft)" : "#fff",
                    color: categoryFilter === "all" ? "var(--primary)" : "var(--text)"
                  }}
                >
                  Todos ({templatesWithCategory.length})
                </button>
                {MODEL_CATEGORIES.map((category) => {
                  const config = getCategoryDefinition(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setCategoryFilter(category)}
                      style={{
                        background: categoryFilter === category ? config.soft : "#fff",
                        color: categoryFilter === category ? config.accent : "var(--text)"
                      }}
                    >
                      {config.label} ({categoryCounts[category]})
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 12
                }}
              >
                {MODEL_CATEGORIES.map((category) => {
                  const config = getCategoryDefinition(category);
                  return (
                    <article
                      key={category}
                      style={{
                        padding: 16,
                        borderRadius: 18,
                        border: "1px solid var(--line)",
                        background: config.soft
                      }}
                    >
                      <div style={{ display: "grid", gap: 6 }}>
                        <strong style={{ color: config.accent }}>{config.label}</strong>
                        <div className="muted" style={{ fontSize: 13 }}>
                          {config.description}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: config.accent }}>
                          Responsavel padrao: {config.defaultResponsible}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        ) : null}

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18
          }}
        >
          {canViewTemplates && loading ? (
            <div className="muted">Carregando templates...</div>
          ) : null}

          {canViewTemplates && !loading && visibleTemplates.length === 0 ? (
            <div className="panel" style={{ padding: 24 }}>
              Nenhum template encontrado para os filtros atuais.
            </div>
          ) : null}

          {canViewTemplates &&
            visibleTemplates.map((template) => (
              <TemplateModelCard
                key={template.id}
                template={template}
                category={template.resolvedCategory}
                canEdit={canEditTemplates}
                onOpen={() => setSelectedTemplate(template)}
              />
            ))}
        </section>

        {routeLoading ? (
          <div className="muted" style={{ fontSize: 13 }}>
            Preparando rota operacional de impressao...
          </div>
        ) : null}

        <TemplatePrintModal
          open={Boolean(selectedTemplate)}
          template={selectedTemplate}
          category={selectedCategory}
          session={session}
          printers={printers}
          profiles={profiles}
          canPrint={canPrintTemplates}
          onClose={() => setSelectedTemplate(null)}
          onPrinted={(message) => setFeedback(message)}
        />
      </DashboardShell>
    </SessionGuard>
  );
}

export default function HomePage() {
  return <TemplatesPageContent />;
}
