"use client";

import { useEditorStore } from "../../lib/editor-store";

export function EditorStatusBar() {
  const {
    history,
    selectedElementId,
    zoom,
    unit,
    statusMessage,
    savingState,
    gridEnabled,
    snapEnabled
  } = useEditorStore();
  const selectedElement = history.present.elements.find((element) => element.id === selectedElementId);
  const savingStateLabel =
    savingState === "saving"
      ? "salvando"
      : savingState === "saved"
        ? "sincronizado"
        : savingState === "error"
          ? "erro"
          : "pronto";

  return (
    <footer className="editor-statusbar">
      <div className="editor-statusbar__message muted">{statusMessage}</div>
      <div className="editor-statusbar__meta">
        <span className="editor-statusbar__pill">{Math.round(zoom * 100)}%</span>
        <span className="editor-statusbar__pill">{gridEnabled ? "grade" : "sem grade"}</span>
        <span className="editor-statusbar__pill">{snapEnabled ? "snap" : "livre"}</span>
        <span className="editor-statusbar__pill">{unit}</span>
        <span className="editor-statusbar__pill">
          {selectedElement
            ? `x:${selectedElement.x} y:${selectedElement.y} w:${selectedElement.width} h:${selectedElement.height} r:${selectedElement.rotation}`
            : "sem selecao"}
        </span>
        <span className="editor-statusbar__pill editor-statusbar__pill--saving">
          {savingStateLabel}
        </span>
      </div>
    </footer>
  );
}
