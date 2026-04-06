"use client";

import Link from "next/link";
import type { LabelElement, TextElement } from "@easyprint/shared/template/document";
import { useEditorStore } from "../../lib/editor-store";
import { measureTextElementHeight, TEXT_FONT_OPTIONS } from "../../lib/editor-text";

const isTextElement = (element: LabelElement | undefined): element is TextElement =>
  Boolean(element && element.type === "text");

export function EditorTopbar({
  editorReadOnly,
  canUndo,
  canRedo,
  canReview,
  canApprove,
  canPublish,
  canCreateVersion,
  canPrintTest,
  showLibrary,
  showInspector,
  onToggleLibrary,
  onToggleInspector,
  onBack,
  onSave,
  onPrintTest,
  onPublish,
  onSubmitReview,
  onApprovalDecision,
  onCreateVersion
}: {
  editorReadOnly: boolean;
  canUndo: boolean;
  canRedo: boolean;
  canReview: boolean;
  canApprove: boolean;
  canPublish: boolean;
  canCreateVersion: boolean;
  canPrintTest: boolean;
  showLibrary: boolean;
  showInspector: boolean;
  onToggleLibrary: () => void;
  onToggleInspector: () => void;
  onBack: () => void;
  onSave: () => void;
  onPrintTest: () => void;
  onPublish: () => void;
  onSubmitReview: () => void;
  onApprovalDecision: (decision: "approved" | "rejected") => void;
  onCreateVersion: () => void;
}) {
  const {
    history,
    selectedElementId,
    zoom,
    setZoom,
    gridEnabled,
    snapEnabled,
    toggleGrid,
    toggleSnap,
    addCanvasElement,
    patchElement,
    patchTemplate,
    duplicateSelectedElement,
    toggleSelectedLock,
    rotateSelectedElement,
    moveSelectedLayer,
    alignSelectedElement,
    undoAction,
    redoAction
  } = useEditorStore();

  const document = history.present;
  const selectedElement = document.elements.find((element) => element.id === selectedElementId);
  const selectionReadOnly = editorReadOnly || selectedElement?.locked;
  const previewHref =
    document.id === "template-new" ? undefined : `/preview/${document.id}`;

  const patchSelectedText = (patch: Partial<TextElement>) => {
    if (!isTextElement(selectedElement) || selectionReadOnly) {
      return;
    }

    const nextElement = { ...selectedElement, ...patch };
    const shouldReflow =
      patch.fontFamily !== undefined ||
      patch.fontSize !== undefined ||
      patch.fontWeight !== undefined ||
      patch.fontStyle !== undefined ||
      patch.textDecoration !== undefined ||
      patch.align !== undefined ||
      patch.lineHeight !== undefined ||
      patch.text !== undefined;

    patchElement(selectedElement.id, {
      ...patch,
      ...(!("height" in patch) && shouldReflow
        ? {
            height: measureTextElementHeight(
              nextElement,
              nextElement.text,
              nextElement.width
            )
          }
        : {})
    });
  };

  return (
    <div className="editor-topbar">
      <div className="editor-topbar__main">
        <div className="editor-topbar__identity">
          <button type="button" className="editor-toolbar__button editor-toolbar__button--ghost" onClick={onBack}>
            Voltar
          </button>
          <div className="editor-topbar__title-block">
            <div className="editor-topbar__eyebrow">EasyPrint / Editor visual</div>
            <div className="editor-topbar__title-row">
              <input
                className="editor-topbar__title-input"
                value={document.name}
                disabled={editorReadOnly}
                onChange={(event) => patchTemplate({ name: event.target.value })}
              />
              <span className="editor-toolbar__tag">v{document.version}</span>
              <span className="editor-toolbar__tag editor-toolbar__tag--status">
                {document.status}
              </span>
              <span className="editor-toolbar__tag">
                {document.document.width} x {document.document.height} {document.document.unit}
              </span>
            </div>
          </div>
        </div>

        <div className="editor-topbar__actions">
          <button
            type="button"
            className={`editor-toolbar__button editor-toolbar__button--ghost ${showLibrary ? "is-active" : ""}`}
            onClick={onToggleLibrary}
          >
            Biblioteca
          </button>
          <button
            type="button"
            className={`editor-toolbar__button editor-toolbar__button--ghost ${showInspector ? "is-active" : ""}`}
            onClick={onToggleInspector}
          >
            Propriedades
          </button>
          {!editorReadOnly ? (
            <button
              type="button"
              className="editor-toolbar__button editor-toolbar__button--primary"
              onClick={onSave}
            >
              Salvar
            </button>
          ) : null}
          {previewHref ? (
            <Link className="editor-toolbar__button editor-toolbar__button--ghost" href={previewHref}>
              Preview
            </Link>
          ) : (
            <span className="editor-toolbar__button editor-toolbar__button--ghost is-disabled">
              Preview
            </span>
          )}
          {canPrintTest ? (
            <button
              type="button"
              className="editor-toolbar__button editor-toolbar__button--ghost"
              onClick={onPrintTest}
            >
              Imprimir
            </button>
          ) : null}
          {canPublish ? (
            <button
              type="button"
              className="editor-toolbar__button editor-toolbar__button--accent"
              disabled={document.status !== "approved"}
              onClick={onPublish}
            >
              Publicar
            </button>
          ) : null}
        </div>
      </div>

      <div className="editor-toolbar">
        <div className="editor-toolbar__group">
          <div className="editor-toolbar__label">Documento</div>
          <button
            type="button"
            className="editor-toolbar__button"
            disabled={!canUndo}
            onClick={undoAction}
          >
            Desfazer
          </button>
          <button
            type="button"
            className="editor-toolbar__button"
            disabled={!canRedo}
            onClick={redoAction}
          >
            Refazer
          </button>
          {canCreateVersion && document.id !== "template-new" ? (
            <button
              type="button"
              className="editor-toolbar__button"
              onClick={onCreateVersion}
            >
              Nova versao
            </button>
          ) : null}
          {canReview && document.status === "draft" && document.id !== "template-new" ? (
            <button
              type="button"
              className="editor-toolbar__button"
              onClick={onSubmitReview}
            >
              Enviar revisao
            </button>
          ) : null}
          {canApprove && document.status === "in_review" ? (
            <>
              <button
                type="button"
                className="editor-toolbar__button"
                onClick={() => onApprovalDecision("rejected")}
              >
                Rejeitar
              </button>
              <button
                type="button"
                className="editor-toolbar__button"
                onClick={() => onApprovalDecision("approved")}
              >
                Aprovar
              </button>
            </>
          ) : null}
        </div>

        <div className="editor-toolbar__group">
          <div className="editor-toolbar__label">Inserir</div>
          {[
            { type: "text", label: "Texto" },
            { type: "barcode", label: "Codigo" },
            { type: "qrcode", label: "QR" },
            { type: "shape", label: "Retangulo" },
            { type: "line", label: "Linha" },
            { type: "image", label: "Imagem" }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              className="editor-toolbar__button"
              disabled={editorReadOnly}
              onClick={() => addCanvasElement(item.type as LabelElement["type"])}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className="editor-toolbar__button"
            disabled={editorReadOnly}
            onClick={() => addCanvasElement("text", { variant: "dynamic" })}
          >
            Campo
          </button>
        </div>

        {selectedElement ? (
          <div className="editor-toolbar__group">
            <div className="editor-toolbar__label">
              {selectedElement.type === "text" ? "Texto" : "Layout"}
            </div>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={editorReadOnly}
              onClick={duplicateSelectedElement}
            >
              Duplicar
            </button>
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.locked ? "is-active" : ""}`}
              disabled={editorReadOnly}
              onClick={toggleSelectedLock}
            >
              {selectedElement.locked ? "Bloqueado" : "Bloquear"}
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => rotateSelectedElement(-15)}
            >
              -15°
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => rotateSelectedElement(15)}
            >
              +15°
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => moveSelectedLayer("backward")}
            >
              Camada -
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => moveSelectedLayer("forward")}
            >
              Camada +
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => alignSelectedElement("center")}
            >
              Centro H
            </button>
            <button
              type="button"
              className="editor-toolbar__button"
              disabled={selectionReadOnly}
              onClick={() => alignSelectedElement("middle")}
            >
              Centro V
            </button>
          </div>
        ) : null}

        {isTextElement(selectedElement) ? (
          <div className="editor-toolbar__group">
            <div className="editor-toolbar__label">Tipografia</div>
            <select
              className="editor-toolbar__control editor-toolbar__control--font"
              value={selectedElement.fontFamily}
              disabled={selectionReadOnly}
              onChange={(event) =>
                patchSelectedText({ fontFamily: event.target.value })
              }
            >
              {TEXT_FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <input
              className="editor-toolbar__control editor-toolbar__control--size"
              type="number"
              min={6}
              max={96}
              value={selectedElement.fontSize}
              disabled={selectionReadOnly}
              onChange={(event) =>
                patchSelectedText({ fontSize: Number(event.target.value) })
              }
            />
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.fontWeight >= 700 ? "is-active" : ""}`}
              disabled={selectionReadOnly}
              onClick={() =>
                patchSelectedText({
                  fontWeight: selectedElement.fontWeight >= 700 ? 500 : 700
                })
              }
            >
              B
            </button>
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.fontStyle === "italic" ? "is-active" : ""}`}
              disabled={selectionReadOnly}
              onClick={() =>
                patchSelectedText({
                  fontStyle: selectedElement.fontStyle === "italic" ? "normal" : "italic"
                })
              }
            >
              I
            </button>
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.align === "left" ? "is-active" : ""}`}
              disabled={selectionReadOnly}
              onClick={() => patchSelectedText({ align: "left" })}
            >
              Esq
            </button>
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.align === "center" ? "is-active" : ""}`}
              disabled={selectionReadOnly}
              onClick={() => patchSelectedText({ align: "center" })}
            >
              Centro
            </button>
            <button
              type="button"
              className={`editor-toolbar__button ${selectedElement.align === "right" ? "is-active" : ""}`}
              disabled={selectionReadOnly}
              onClick={() => patchSelectedText({ align: "right" })}
            >
              Dir
            </button>
          </div>
        ) : null}

        <div className="editor-toolbar__group">
          <div className="editor-toolbar__label">Visualizacao</div>
          <button
            type="button"
            className="editor-toolbar__button"
            onClick={() => setZoom(Math.max(0.35, Number((zoom - 0.1).toFixed(2))))}
          >
            -
          </button>
          <span className="editor-toolbar__readout">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="editor-toolbar__button"
            onClick={() => setZoom(Math.min(3, Number((zoom + 0.1).toFixed(2))))}
          >
            +
          </button>
          <button
            type="button"
            className={`editor-toolbar__button ${gridEnabled ? "is-active" : ""}`}
            onClick={toggleGrid}
          >
            Grade
          </button>
          <button
            type="button"
            className={`editor-toolbar__button ${snapEnabled ? "is-active" : ""}`}
            onClick={toggleSnap}
          >
            Snap
          </button>
        </div>
      </div>
    </div>
  );
}
