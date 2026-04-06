"use client";

import Link from "next/link";
import { StatusBadge } from "@easyprint/ui";
import type { TemplateListItem } from "../../lib/api";
import { getCategoryDefinition, type ModelCategory } from "../../lib/template-library";

const formatTemplateDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short"
  }).format(new Date(value));

export function TemplateModelCard({
  template,
  category,
  canEdit,
  onOpen
}: {
  template: TemplateListItem;
  category: ModelCategory;
  canEdit: boolean;
  onOpen: () => void;
}) {
  const categoryConfig = getCategoryDefinition(category);

  return (
    <article className="panel model-library-card">
      <button type="button" className="model-library-card__surface" onClick={onOpen}>
        <div
          className="model-library-card__preview"
          style={{
            background: `linear-gradient(145deg, ${categoryConfig.soft}, rgba(255,255,255,0.94))`
          }}
        >
          <div className="model-library-card__preview-tag" style={{ color: categoryConfig.accent }}>
            {categoryConfig.label}
          </div>

          <div className="model-library-card__label">
            <div
              className="model-library-card__label-top"
              style={{ background: categoryConfig.accent }}
            />
            <div className="model-library-card__label-content">
              <div
                className="model-library-card__label-title"
                style={{ background: categoryConfig.soft }}
              />
              <div className="model-library-card__label-line" />
              <div className="model-library-card__label-line model-library-card__label-line--short" />
              <div className="model-library-card__label-code" />
              <div className="model-library-card__label-footer">
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="model-library-card__content">
          <div className="model-library-card__title-block">
            <div className="model-library-card__eyebrow">Modelo operacional</div>
            <strong>{template.name}</strong>
            <div className="muted">{categoryConfig.description}</div>
          </div>

          <div className="model-library-card__meta">
            <span className="model-library-pill">v{template.currentVersion}</span>
            <StatusBadge status={template.status}>{template.status}</StatusBadge>
            {template.lastPublishedVersion ? (
              <span className="model-library-pill">
                publicado v{template.lastPublishedVersion}
              </span>
            ) : null}
          </div>

          <div className="model-library-card__details">
            <span>Responsavel base: {categoryConfig.defaultResponsible}</span>
            <span>Atualizado em {formatTemplateDate(template.updatedAt)}</span>
          </div>
        </div>
      </button>

      <div className="model-library-card__footer">
        <div className="model-library-card__footer-copy">
          Entre pelo fluxo rapido ou abra o mesmo layout no editor para ajustes livres.
        </div>

        <div className="model-library-card__actions">
          <button type="button" className="model-library-card__primary" onClick={onOpen}>
            Preencher e imprimir
          </button>
          {canEdit ? (
            <Link className="model-library-card__secondary" href={`/editor/${template.id}`}>
              Abrir no editor
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
