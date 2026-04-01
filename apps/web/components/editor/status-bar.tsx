"use client";

import { useEditorStore } from "../../lib/editor-store";

export function EditorStatusBar() {
  const {
    history,
    selectedElementId,
    zoom,
    setZoom,
    unit,
    statusMessage,
    savingState,
    gridEnabled,
    snapEnabled,
    gridSize,
    toggleGrid,
    toggleSnap,
    setGridSize
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
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "0 18px",
        borderTop: "1px solid var(--line)",
        fontSize: 13
      }}
    >
      <div className="muted">{statusMessage}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Zoom {Math.round(zoom * 100)}%</span>
          <input
            type="range"
            min="0.35"
            max="3"
            step="0.05"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          />
        </label>
        <button onClick={() => setZoom(Math.max(0.35, Number((zoom - 0.1).toFixed(2))))}>-</button>
        <button onClick={() => setZoom(Math.min(3, Number((zoom + 0.1).toFixed(2))))}>+</button>
        <button onClick={() => setZoom(0.75)}>75%</button>
        <button onClick={() => setZoom(1)}>100%</button>
        <button onClick={() => setZoom(1.5)}>150%</button>
        <button onClick={toggleGrid}>{gridEnabled ? "Grade on" : "Grade off"}</button>
        <button onClick={toggleSnap}>{snapEnabled ? "Snap on" : "Snap off"}</button>
        <label>
          Grid{" "}
          <select value={gridSize} onChange={(event) => setGridSize(Number(event.target.value))}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
          </select>
        </label>
        <span>{unit}</span>
        <span>
          {selectedElement
            ? `x:${selectedElement.x} y:${selectedElement.y} w:${selectedElement.width} h:${selectedElement.height} r:${selectedElement.rotation} ${selectedElement.locked ? "lock" : "free"}`
            : "sem selecao"}
        </span>
        <span className="muted">Ctrl/Cmd + roda para zoom</span>
        <span>{savingStateLabel}</span>
      </div>
    </footer>
  );
}
