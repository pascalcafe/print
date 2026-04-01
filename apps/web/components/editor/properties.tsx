"use client";

import {
  type LabelElement,
  type LabelUnit,
  type TextElement
} from "@easyprint/shared/template/document";
import { getMissingRequiredFields } from "@easyprint/shared/template/render";
import type { TemplateApprovalItem, TemplateVersionItem } from "../../lib/api";
import { uploadAsset } from "../../lib/api";
import { measureTextElementHeight, TEXT_FONT_OPTIONS } from "../../lib/editor-text";
import { useEditorStore } from "../../lib/editor-store";
import { loadStoredSession } from "../../lib/session";

export function EditorProperties({
  readOnly = false,
  canManageAssets = false,
  versions = [],
  approvals = [],
  onRollback,
  rollbackPending = false,
  onCreateVersion,
  createVersionPending = false
}: {
  readOnly?: boolean;
  canManageAssets?: boolean;
  versions?: TemplateVersionItem[];
  approvals?: TemplateApprovalItem[];
  onRollback?: (version: number) => void;
  rollbackPending?: boolean;
  onCreateVersion?: () => void;
  createVersionPending?: boolean;
}) {
  const {
    history,
    selectedElementId,
    patchElement,
    patchDocument,
    patchTemplate,
    addTemplateDataField,
    patchTemplateDataField,
    removeTemplateDataField,
    duplicateSelectedElement,
    toggleSelectedLock,
    rotateSelectedElement,
    moveSelectedLayer,
    alignSelectedElement
  } = useEditorStore();
  const document = history.present;
  const selectedElement = document.elements.find((element) => element.id === selectedElementId);
  const elementReadOnly = readOnly || selectedElement?.locked;
  const missingRequiredFields = getMissingRequiredFields(document);

  const patchSelectedElement = (patch: Partial<LabelElement>) => {
    if (!selectedElement) return;

    if (selectedElement.type === "text") {
      const textPatch = patch as Partial<TextElement>;
      const nextElement = { ...selectedElement, ...patch } as TextElement;
      const shouldReflowText =
        textPatch.text !== undefined ||
        textPatch.width !== undefined ||
        textPatch.fontSize !== undefined ||
        textPatch.fontFamily !== undefined ||
        textPatch.fontWeight !== undefined ||
        textPatch.fontStyle !== undefined ||
        textPatch.textDecoration !== undefined ||
        textPatch.lineHeight !== undefined ||
        textPatch.align !== undefined;

      patchElement(selectedElement.id, {
        ...patch,
        ...(!("height" in patch) && shouldReflowText
          ? {
              height: measureTextElementHeight(
                nextElement,
                nextElement.text,
                nextElement.width
              )
            }
          : {})
      });
      return;
    }

    patchElement(selectedElement.id, patch);
  };

  const handleNumericField = (key: string, value: string) => {
    if (!selectedElement) return;
    patchSelectedElement({ [key]: Number(value) } as Partial<LabelElement>);
  };

  return (
    <aside className="editor-sidebar">
      <div className="editor-sidebar__header">
        <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
          Propriedades
        </div>
        <strong>{selectedElement ? selectedElement.name : "Documento"}</strong>
      </div>

      <div className="editor-sidebar__body" style={{ display: "grid", gap: 18, alignContent: "start" }}>
      <section className="panel" style={{ padding: 16, borderRadius: 18, boxShadow: "none" }}>
        <div style={{ display: "grid", gap: 12 }}>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Nome do template
            </div>
            <input
              value={document.name}
              disabled={readOnly}
              onChange={(event) => patchTemplate({ name: event.target.value })}
            />
          </label>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Largura
            </div>
            <input
              value={document.document.width}
              type="number"
              disabled={readOnly}
              onChange={(event) => patchDocument({ width: Number(event.target.value) })}
            />
          </label>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Altura
            </div>
            <input
              value={document.document.height}
              type="number"
              disabled={readOnly}
              onChange={(event) => patchDocument({ height: Number(event.target.value) })}
            />
          </label>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Unidade
            </div>
            <select
              value={document.document.unit}
              disabled={readOnly}
              onChange={(event) =>
                patchDocument({ unit: event.target.value as LabelUnit })
              }
            >
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="px">px</option>
            </select>
          </label>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Status
            </div>
            <select
              value={document.status}
              disabled
              onChange={() => undefined}
            >
              <option value="draft">draft</option>
              <option value="in_review">in_review</option>
              <option value="approved">approved</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </label>
        </div>
      </section>

      {!selectedElement ? (
        <>
          <section className="panel" style={{ padding: 16, borderRadius: 18, boxShadow: "none" }}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Campos dinamicos
                  </div>
                  <strong>Data schema</strong>
                </div>
                <button disabled={readOnly} onClick={() => addTemplateDataField()}>
                  Novo campo
                </button>
              </div>

              {missingRequiredFields.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gap: 6,
                    padding: 12,
                    borderRadius: 14,
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "1px solid rgba(245, 158, 11, 0.18)"
                  }}
                >
                  <strong style={{ fontSize: 13 }}>Campos obrigatorios sem preview completo</strong>
                  <div className="muted" style={{ fontSize: 12 }}>
                    {missingRequiredFields.map((field) => field.label).join(", ")}
                  </div>
                </div>
              ) : null}

              {document.dataSchema.length === 0 ? (
                <div className="muted" style={{ fontSize: 13 }}>
                  Nenhum campo dinamico configurado ainda.
                </div>
              ) : null}

              {document.dataSchema.map((field) => (
                <div
                  key={field.key}
                  style={{
                    display: "grid",
                    gap: 10,
                    padding: 12,
                    borderRadius: 14,
                    border: "1px solid var(--line)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <strong>{field.label}</strong>
                    <button disabled={readOnly} onClick={() => removeTemplateDataField(field.key)}>
                      Remover
                    </button>
                  </div>
                  <label>
                    <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                      Chave
                    </div>
                    <input
                      value={field.key}
                      disabled={readOnly}
                      onChange={(event) =>
                        patchTemplateDataField(field.key, { key: event.target.value.trim() || field.key })
                      }
                    />
                  </label>
                  <label>
                    <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                      Rotulo
                    </div>
                    <input
                      value={field.label}
                      disabled={readOnly}
                      onChange={(event) =>
                        patchTemplateDataField(field.key, { label: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                      Descricao
                    </div>
                    <input
                      value={field.description ?? ""}
                      disabled={readOnly}
                      onChange={(event) =>
                        patchTemplateDataField(field.key, { description: event.target.value })
                      }
                    />
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Tipo
                      </div>
                      <select
                        value={field.type}
                        disabled={readOnly}
                        onChange={(event) =>
                          patchTemplateDataField(field.key, {
                            type: event.target.value as typeof field.type
                          })
                        }
                      >
                        <option value="text">text</option>
                        <option value="number">number</option>
                        <option value="date">date</option>
                        <option value="boolean">boolean</option>
                      </select>
                    </label>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Formato
                      </div>
                      <select
                        value={field.formatType ?? "text"}
                        disabled={readOnly}
                        onChange={(event) =>
                          patchTemplateDataField(field.key, {
                            formatType: event.target.value as NonNullable<typeof field.formatType>
                          })
                        }
                      >
                        <option value="text">text</option>
                        <option value="date">date</option>
                        <option value="currency">currency</option>
                        <option value="uppercase">uppercase</option>
                        <option value="lowercase">lowercase</option>
                      </select>
                    </label>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Exemplo
                      </div>
                      <input
                        value={field.sampleValue === undefined ? "" : String(field.sampleValue)}
                        disabled={readOnly}
                        onChange={(event) =>
                          patchTemplateDataField(field.key, { sampleValue: event.target.value })
                        }
                      />
                    </label>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Fallback
                      </div>
                      <input
                        value={field.fallbackValue ?? ""}
                        disabled={readOnly}
                        onChange={(event) =>
                          patchTemplateDataField(field.key, { fallbackValue: event.target.value })
                        }
                      />
                    </label>
                  </div>
                  <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      disabled={readOnly}
                      onChange={(event) =>
                        patchTemplateDataField(field.key, { required: event.target.checked })
                      }
                    />
                    Obrigatorio no preview
                  </label>
                </div>
              ))}
            </div>
          </section>

          {versions.length > 0 ? (
            <section className="panel" style={{ padding: 16, borderRadius: 18, boxShadow: "none" }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                      Historico de versoes
                    </div>
                    <strong>Versoes recentes</strong>
                  </div>
                  <button disabled={readOnly || createVersionPending || !onCreateVersion} onClick={() => onCreateVersion?.()}>
                    Nova versao
                  </button>
                </div>

                {versions.slice(0, 6).map((version) => (
                  <div
                    key={version.id}
                    style={{
                      display: "grid",
                      gap: 8,
                      padding: 12,
                      borderRadius: 14,
                      border: "1px solid var(--line)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <strong>v{version.version}</strong>
                      <span className="muted" style={{ fontSize: 12 }}>
                        {version.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {new Date(version.createdAt).toLocaleString("pt-BR")}
                    </div>
                    {version.notes ? (
                      <div className="muted" style={{ fontSize: 12 }}>
                        {version.notes}
                      </div>
                    ) : null}
                    {version.compareSummary ? (
                      <div className="muted" style={{ fontSize: 12 }}>
                        delta elementos {version.compareSummary.elementsDelta >= 0 ? "+" : ""}
                        {version.compareSummary.elementsDelta} | delta campos{" "}
                        {version.compareSummary.dataFieldsDelta >= 0 ? "+" : ""}
                        {version.compareSummary.dataFieldsDelta}
                        {version.compareSummary.sizeChanged ? " | tamanho alterado" : ""}
                      </div>
                    ) : null}
                    <div>
                      <button
                        disabled={readOnly || rollbackPending || !onRollback}
                        onClick={() => onRollback?.(version.version)}
                      >
                        Restaurar esta versao
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {approvals.length > 0 ? (
            <section className="panel" style={{ padding: 16, borderRadius: 18, boxShadow: "none" }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Governanca
                  </div>
                  <strong>Aprovacoes recentes</strong>
                </div>

                {approvals.slice(0, 5).map((approval) => (
                  <div
                    key={approval.id}
                    style={{
                      display: "grid",
                      gap: 8,
                      padding: 12,
                      borderRadius: 14,
                      border: "1px solid var(--line)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <strong>{approval.status.toLowerCase()}</strong>
                      <span className="muted" style={{ fontSize: 12 }}>
                        {new Date(approval.requestedAt).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 12 }}>
                      solicitado por {approval.requestedBy?.name ?? "usuario"}
                    </div>
                    {approval.requestNotes ? (
                      <div className="muted" style={{ fontSize: 12 }}>
                        {approval.requestNotes}
                      </div>
                    ) : null}
                    {approval.decisionNotes ? (
                      <div className="muted" style={{ fontSize: 12 }}>
                        decisao: {approval.decisionNotes}
                      </div>
                    ) : null}
                    {approval.signatures?.length ? (
                      <div className="muted" style={{ fontSize: 12 }}>
                        assinatura: {approval.signatures[0]?.action}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      {selectedElement ? (
        <section className="panel" style={{ padding: 16, borderRadius: 18, boxShadow: "none" }}>
          <div style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                display: "grid",
                gap: 8,
                padding: 12,
                borderRadius: 14,
                background: "rgba(15,23,42,0.03)"
              }}
            >
              <div className="muted" style={{ fontSize: 12 }}>
                Acoes rapidas
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button disabled={readOnly} onClick={() => duplicateSelectedElement()}>
                  Duplicar
                </button>
                <button disabled={readOnly} onClick={() => toggleSelectedLock()}>
                  {selectedElement.locked ? "Desbloquear" : "Bloquear"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button disabled={elementReadOnly} onClick={() => moveSelectedLayer("backward")}>
                  Camada -
                </button>
                <button disabled={elementReadOnly} onClick={() => moveSelectedLayer("forward")}>
                  Camada +
                </button>
                <button disabled={elementReadOnly} onClick={() => moveSelectedLayer("back")}>
                  Para tras
                </button>
                <button disabled={elementReadOnly} onClick={() => moveSelectedLayer("front")}>
                  Para frente
                </button>
              </div>
            </div>

            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Posicao X
              </div>
              <input
                value={selectedElement.x}
                type="number"
                disabled={elementReadOnly}
                onChange={(event) => handleNumericField("x", event.target.value)}
              />
            </label>
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Posicao Y
              </div>
              <input
                value={selectedElement.y}
                type="number"
                disabled={elementReadOnly}
                onChange={(event) => handleNumericField("y", event.target.value)}
              />
            </label>
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Largura
              </div>
              <input
                value={selectedElement.width}
                type="number"
                disabled={elementReadOnly}
                onChange={(event) => handleNumericField("width", event.target.value)}
              />
            </label>
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Altura
              </div>
              <input
                value={selectedElement.height}
                type="number"
                disabled={elementReadOnly}
                onChange={(event) => handleNumericField("height", event.target.value)}
              />
            </label>
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Rotacao
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 44px", gap: 8 }}>
                <button disabled={elementReadOnly} onClick={() => rotateSelectedElement(-15)}>
                  -15
                </button>
                <input
                  value={selectedElement.rotation}
                  type="number"
                  disabled={elementReadOnly}
                  onChange={(event) =>
                    patchElement(
                      selectedElement.id,
                      { rotation: Number(event.target.value) } as Partial<LabelElement>
                    )
                  }
                />
                <button disabled={elementReadOnly} onClick={() => rotateSelectedElement(15)}>
                  +15
                </button>
              </div>
            </label>
            <div style={{ display: "grid", gap: 8 }}>
              <div className="muted" style={{ fontSize: 12 }}>
                Alinhamento no canvas
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("left")}>
                  Esq
                </button>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("center")}>
                  Centro H
                </button>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("right")}>
                  Dir
                </button>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("top")}>
                  Topo
                </button>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("middle")}>
                  Centro V
                </button>
                <button disabled={elementReadOnly} onClick={() => alignSelectedElement("bottom")}>
                  Base
                </button>
              </div>
            </div>

            {selectedElement.type === "text" ? (
              <>
                <label>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Conteudo
                  </div>
                  <textarea
                    value={selectedElement.text}
                    rows={4}
                    disabled={elementReadOnly}
                    onChange={(event) =>
                      patchSelectedElement({ text: event.target.value } as Partial<LabelElement>)
                    }
                    style={{ minHeight: 108 }}
                  />
                </label>
                <section
                  style={{
                    display: "grid",
                    gap: 12,
                    padding: 12,
                    borderRadius: 14,
                    background: "rgba(15,23,42,0.03)"
                  }}
                >
                  <div className="muted" style={{ fontSize: 12 }}>
                    Tipografia
                  </div>

                  <label>
                    <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                      Fonte
                    </div>
                    <select
                      value={selectedElement.fontFamily}
                      disabled={elementReadOnly}
                      onChange={(event) =>
                        patchSelectedElement({ fontFamily: event.target.value } as Partial<LabelElement>)
                      }
                    >
                      {TEXT_FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Tamanho
                      </div>
                      <input
                        type="number"
                        min={6}
                        max={96}
                        value={selectedElement.fontSize}
                        disabled={elementReadOnly}
                        onChange={(event) =>
                          patchSelectedElement({ fontSize: Number(event.target.value) } as Partial<LabelElement>)
                        }
                      />
                    </label>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Altura da linha
                      </div>
                      <input
                        type="number"
                        min={0.8}
                        max={2.4}
                        step={0.05}
                        value={selectedElement.lineHeight}
                        disabled={elementReadOnly}
                        onChange={(event) =>
                          patchSelectedElement({ lineHeight: Number(event.target.value) } as Partial<LabelElement>)
                        }
                      />
                    </label>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Cor
                      </div>
                      <input
                        type="color"
                        value={selectedElement.color}
                        disabled={elementReadOnly}
                        onChange={(event) =>
                          patchSelectedElement({ color: event.target.value } as Partial<LabelElement>)
                        }
                        style={{ minHeight: 44, padding: 6 }}
                      />
                    </label>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    <button
                      type="button"
                      disabled={elementReadOnly}
                      onClick={() =>
                        patchSelectedElement({
                          fontWeight: selectedElement.fontWeight >= 700 ? 500 : 700
                        } as Partial<LabelElement>)
                      }
                      style={{
                        fontWeight: 700,
                        background:
                          selectedElement.fontWeight >= 700 ? "var(--primary-soft)" : "#ffffff"
                      }}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      disabled={elementReadOnly}
                      onClick={() =>
                        patchSelectedElement({
                          fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic"
                        } as Partial<LabelElement>)
                      }
                      style={{
                        fontStyle: "italic",
                        background:
                          selectedElement.fontStyle === "italic" ? "var(--primary-soft)" : "#ffffff"
                      }}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      disabled={elementReadOnly}
                      onClick={() =>
                        patchSelectedElement({
                          textDecoration:
                            selectedElement.textDecoration === "underline" ? "none" : "underline"
                        } as Partial<LabelElement>)
                      }
                      style={{
                        textDecoration: "underline",
                        background:
                          selectedElement.textDecoration === "underline"
                            ? "var(--primary-soft)"
                            : "#ffffff"
                      }}
                    >
                      U
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[
                      { value: "left", label: "Esq" },
                      { value: "center", label: "Centro" },
                      { value: "right", label: "Dir" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        disabled={elementReadOnly}
                        onClick={() =>
                          patchSelectedElement({ align: item.value as TextElement["align"] } as Partial<LabelElement>)
                        }
                        style={{
                          background:
                            selectedElement.align === item.value ? "var(--primary-soft)" : "#ffffff"
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={elementReadOnly}
                    onClick={() =>
                      patchSelectedElement({
                        height: measureTextElementHeight(
                          selectedElement,
                          selectedElement.text,
                          selectedElement.width
                        )
                      } as Partial<LabelElement>)
                    }
                  >
                    Ajustar caixa ao conteudo
                  </button>
                </section>
                {selectedElement.contentMode === "dynamic" ? (
                  <>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Binding
                      </div>
                      <select
                        value={selectedElement.bindingKey ?? ""}
                        disabled={elementReadOnly}
                        onChange={(event) =>
                          patchSelectedElement(
                            {
                              bindingKey: event.target.value || undefined,
                              text: event.target.value ? `{{${event.target.value}}}` : selectedElement.text
                            } as Partial<LabelElement>
                          )
                        }
                      >
                        <option value="">Selecione um campo</option>
                        {document.dataSchema.map((field) => (
                          <option key={field.key} value={field.key}>
                            {field.label} ({field.key})
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                        Placeholder
                      </div>
                      <input
                        value={selectedElement.placeholder ?? ""}
                        disabled={elementReadOnly}
                        onChange={(event) =>
                          patchSelectedElement({ placeholder: event.target.value } as Partial<LabelElement>)
                        }
                      />
                    </label>
                  </>
                ) : null}
              </>
            ) : null}

            {selectedElement.type === "barcode" ? (
              <>
                <label>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Valor
                  </div>
                  <input
                    value={selectedElement.value}
                    disabled={elementReadOnly}
                    onChange={(event) =>
                      patchElement(
                        selectedElement.id,
                        { value: event.target.value } as Partial<LabelElement>
                      )
                    }
                  />
                </label>
                <label>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Formato
                  </div>
                  <select
                    value={selectedElement.format}
                    disabled={elementReadOnly}
                    onChange={(event) =>
                      patchElement(
                        selectedElement.id,
                        { format: event.target.value } as Partial<LabelElement>
                      )
                    }
                  >
                    <option value="CODE128">CODE128</option>
                    <option value="EAN13">EAN13</option>
                  </select>
                </label>
              </>
            ) : null}

            {selectedElement.type === "qrcode" ? (
              <>
                <label>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Valor
                  </div>
                  <input
                    value={selectedElement.value}
                    disabled={elementReadOnly}
                    onChange={(event) =>
                      patchElement(
                        selectedElement.id,
                        { value: event.target.value } as Partial<LabelElement>
                      )
                    }
                  />
                </label>
                <label>
                  <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                    Correcao
                  </div>
                  <select
                    value={selectedElement.errorCorrection}
                    disabled={elementReadOnly}
                    onChange={(event) =>
                      patchElement(
                        selectedElement.id,
                        { errorCorrection: event.target.value } as Partial<LabelElement>
                      )
                    }
                  >
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="Q">Q</option>
                    <option value="H">H</option>
                  </select>
                </label>
              </>
            ) : null}

            {selectedElement.type === "shape" ? (
              <label>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                  Borda
                </div>
                <input
                  value={selectedElement.stroke}
                  disabled={elementReadOnly}
                  onChange={(event) =>
                    patchElement(selectedElement.id, { stroke: event.target.value } as Partial<LabelElement>)
                  }
                />
              </label>
            ) : null}

            {selectedElement.type === "image" && canManageAssets && !readOnly ? (
              <label>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                  Upload
                </div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={elementReadOnly}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    const session = loadStoredSession();
                    if (!file || !session) return;
                    const uploaded = await uploadAsset(file, session);
                    patchElement(
                      selectedElement.id,
                      {
                        assetId: uploaded.id,
                        src: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}${uploaded.url}`
                      } as Partial<LabelElement>
                    );
                  }}
                />
              </label>
            ) : null}
          </div>
        </section>
      ) : null}
      </div>
    </aside>
  );
}
