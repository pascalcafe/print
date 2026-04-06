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

    void Promise.all([fetchPrinters(session, { active: "true" }), fetchPrintProfiles(session)])
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

  const selectedCategory = selectedTemplate ? inferTemplateCategory(selectedTemplate) : null;
  const activeCategoryDefinition =
    categoryFilter === "all" ? null : getCategoryDefinition(categoryFilter);
  const publishedCount = templatesWithCategory.filter(
    (template) => template.status === "PUBLISHED"
  ).length;
  const reviewableCount = templatesWithCategory.filter((template) =>
    ["APPROVED", "PUBLISHED"].includes(template.status)
  ).length;
  const routeSummary = !canPrintTemplates
    ? "Seu papel atual nao libera impressao operacional."
    : routeLoading
      ? "Preparando rota operacional e consultando impressoras ativas."
      : printers.length > 0
        ? `${printers.length} impressora${printers.length > 1 ? "s" : ""} ativa${printers.length > 1 ? "s" : ""} e ${profiles.length} perfil${profiles.length > 1 ? "s" : ""} pronto${profiles.length > 1 ? "s" : ""} para o fluxo rapido.`
        : "Fluxo rapido disponivel via navegador, pronto para crescer para rotas locais dedicadas.";

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Biblioteca de Modelos"
        subtitle="Combine uma entrada operacional forte com o editor visual livre. A biblioteca resolve o dia a dia; o editor continua sendo a origem da verdade do layout."
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
        <div className="model-library-screen">
          {!canViewTemplates ? (
            <div className="panel" style={{ padding: 24 }}>
              Seu papel atual nao possui acesso a biblioteca de templates.
            </div>
          ) : null}

          {feedback ? (
            <section className="panel model-library-feedback">
              <div className="model-library-feedback__copy">{feedback}</div>
              <button type="button" onClick={() => setFeedback(null)}>
                Fechar
              </button>
            </section>
          ) : null}

          {canViewTemplates ? (
            <>
              <section className="panel model-library-hero">
                <div className="model-library-hero__intro">
                  <div className="model-library-hero__eyebrow">
                    Benchmark funcional: software tecnico leve
                  </div>
                  <h2 className="model-library-hero__title">
                    Biblioteca operacional para imprimir rapido, com ponte direta para a edicao
                    livre.
                  </h2>
                  <p className="model-library-hero__subtitle">
                    O fluxo rapido comeca pela categoria e termina na impressao. Quando o modelo
                    precisa evoluir, o editor continua no centro do produto com preview e
                    impressao compartilhando o mesmo renderer.
                  </p>
                </div>

                <div className="model-library-hero__modes">
                  <article className="model-library-hero__mode">
                    <div className="model-library-hero__mode-label">Fluxo A</div>
                    <strong>Biblioteca de modelos</strong>
                    <p>
                      Escolha a categoria, abra o modal operacional, preencha o lote e imprima sem
                      sair do contexto.
                    </p>
                  </article>

                  <article className="model-library-hero__mode">
                    <div className="model-library-hero__mode-label">Fluxo B</div>
                    <strong>Edicao livre do template</strong>
                    <p>
                      Abra o modelo no editor para ajustar layout, tipografia, campos dinamicos e
                      a base oficial de preview e impressao.
                    </p>
                  </article>
                </div>

                <div className="model-library-hero__stats">
                  <div className="model-library-stat">
                    <span className="model-library-stat__value">
                      {templatesWithCategory.length}
                    </span>
                    <span className="model-library-stat__label">modelos no tenant</span>
                  </div>
                  <div className="model-library-stat">
                    <span className="model-library-stat__value">{publishedCount}</span>
                    <span className="model-library-stat__label">publicados</span>
                  </div>
                  <div className="model-library-stat">
                    <span className="model-library-stat__value">{reviewableCount}</span>
                    <span className="model-library-stat__label">prontos para operacao</span>
                  </div>
                  <div className="model-library-stat model-library-stat--wide">
                    <span className="model-library-stat__value">
                      {canPrintTemplates ? "browser print" : "consulta"}
                    </span>
                    <span className="model-library-stat__label">{routeSummary}</span>
                  </div>
                </div>
              </section>

              <section className="panel model-library-toolbar">
                <div className="model-library-toolbar__copy">
                  <strong>Entrada forte pela biblioteca</strong>
                  <div className="muted">
                    Filtre o que interessa, escolha o modelo certo e siga para impressao rapida ou
                    ajuste livre no editor.
                  </div>
                </div>

                <div className="model-library-toolbar__filters">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar por nome ou slug"
                  />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                  >
                    <option value="all">Todos os status</option>
                    <option value="DRAFT">Draft</option>
                    <option value="IN_REVIEW">In review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </section>

              <section className="model-library-layout">
                <aside className="panel model-library-categories">
                  <div className="model-library-categories__header">
                    <div>
                      <strong>Categorias operacionais</strong>
                      <div className="muted">
                        Cada categoria organiza modelos, responsavel padrao e atalho de uso.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`model-library-category ${categoryFilter === "all" ? "is-active" : ""}`}
                    onClick={() => setCategoryFilter("all")}
                  >
                    <div className="model-library-category__row">
                      <strong>Todos os modelos</strong>
                      <span>{templatesWithCategory.length}</span>
                    </div>
                    <div className="model-library-category__description">
                      Visao geral para operadores e para quem precisa comparar categorias antes de
                      abrir um modelo.
                    </div>
                  </button>

                  <div className="model-library-category-list">
                    {MODEL_CATEGORIES.map((category) => {
                      const config = getCategoryDefinition(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          className={`model-library-category ${categoryFilter === category ? "is-active" : ""}`}
                          onClick={() => setCategoryFilter(category)}
                        >
                          <div className="model-library-category__row">
                            <strong style={{ color: config.accent }}>{config.label}</strong>
                            <span>{categoryCounts[category]}</span>
                          </div>
                          <div className="model-library-category__description">
                            {config.description}
                          </div>
                          <div className="model-library-category__responsible">
                            Responsavel padrao: {config.defaultResponsible}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                <div className="model-library-content">
                  <section className="panel model-library-content__header">
                    <div className="model-library-content__copy">
                      <strong>
                        {activeCategoryDefinition
                          ? activeCategoryDefinition.label
                          : "Biblioteca completa"}
                      </strong>
                      <div className="muted">
                        {activeCategoryDefinition
                          ? `${activeCategoryDefinition.description} O fluxo rapido ja abre com ${activeCategoryDefinition.defaultResponsible.toLowerCase()} e datas preenchidas.`
                          : "Navegue por categorias para reduzir ruido visual ou mantenha todos os modelos lado a lado para uma visao mais ampla."}
                      </div>
                    </div>

                    <div className="model-library-content__meta">
                      <span className="model-library-pill">
                        {visibleTemplates.length}{" "}
                        {visibleTemplates.length === 1 ? "visivel" : "visiveis"}
                      </span>
                      {statusFilter !== "all" ? (
                        <span className="model-library-pill">status: {statusFilter}</span>
                      ) : null}
                      {search ? (
                        <span className="model-library-pill">busca: {search}</span>
                      ) : null}
                    </div>
                  </section>

                  <section className="model-library-grid">
                    {loading ? <div className="muted">Carregando templates...</div> : null}

                    {!loading && visibleTemplates.length === 0 ? (
                      <div className="panel model-library-empty">
                        Nenhum template encontrado para os filtros atuais.
                      </div>
                    ) : null}

                    {!loading &&
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
                </div>
              </section>
            </>
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
        </div>
      </DashboardShell>
    </SessionGuard>
  );
}

export default function HomePage() {
  return <TemplatesPageContent />;
}
