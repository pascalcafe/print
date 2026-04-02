"use client";

import Link from "next/link";
import { StatusBadge } from "@easyprint/ui";
import type { TemplateListItem } from "../../lib/api";
import {
  getCategoryDefinition,
  type ModelCategory
} from "../../lib/template-library";

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
    <article
      className="panel"
      style={{
        padding: 20,
        display: "grid",
        gap: 16,
        borderRadius: 20
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{
          display: "grid",
          gap: 16,
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: 0
        }}
      >
        <div
          style={{
            padding: 18,
            minHeight: 152,
            borderRadius: 18,
            border: "1px solid var(--line)",
            background: `linear-gradient(135deg, ${categoryConfig.soft}, rgba(255,255,255,0.94))`,
            display: "grid",
            alignContent: "space-between",
            gap: 12
          }}
        >
          <div
            style={{
              width: "fit-content",
              padding: "6px 10px",
              borderRadius: 999,
              background: "#ffffff",
              color: categoryConfig.accent,
              border: `1px solid ${categoryConfig.soft}`,
              fontSize: 12,
              fontWeight: 700
            }}
          >
            {categoryConfig.label}
          </div>
          <div
            style={{
              width: 190,
              height: 88,
              background: "#fff",
              borderRadius: 12,
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 8px 20px rgba(15,23,42,0.06)",
              padding: 12,
              display: "grid",
              gap: 8
            }}
          >
            <div
              style={{
                width: "62%",
                height: 10,
                borderRadius: 999,
                background: categoryConfig.soft
              }}
            />
            <div
              style={{
                width: "88%",
                height: 8,
                borderRadius: 999,
                background: "rgba(15,23,42,0.08)"
              }}
            />
            <div
              style={{
                width: "54%",
                height: 8,
                borderRadius: 999,
                background: "rgba(15,23,42,0.08)"
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontWeight: 600 }}>{template.name}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {categoryConfig.description}
            </div>
          </div>

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
      </button>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onOpen}
          style={{
            background: "var(--primary)",
            color: "#fff",
            border: "none",
            paddingInline: 16
          }}
        >
          Preencher e imprimir
        </button>
        {canEdit ? <Link href={`/editor/${template.id}`}>Editar modelo</Link> : null}
      </div>
    </article>
  );
}
