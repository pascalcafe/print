"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  type WheelEvent
} from "react";
import {
  type LabelElement,
  type TextElement
} from "@easyprint/shared/template/document";
import { buildPreviewPayload } from "@easyprint/shared/template/render";
import { useEditorStore } from "../../lib/editor-store";
import {
  EDITOR_UNIT_SCALE,
  getTextElementStyle,
  measureTextElementHeight
} from "../../lib/editor-text";
import {
  getElementFrameStyle,
  LabelElementContent
} from "./document-renderer";

type InteractionMode = "move" | "resize";
const MIN_ZOOM = 0.35;
const MAX_ZOOM = 3;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isTextElement = (element: LabelElement | undefined): element is TextElement =>
  Boolean(element && element.type === "text");

export function EditorCanvas({ readOnly = false }: { readOnly?: boolean }) {
  const {
    history,
    selectedElementId,
    selectElement,
    patchElement,
    zoom,
    setZoom,
    gridEnabled,
    snapEnabled,
    gridSize,
    markStatus
  } = useEditorStore();
  const document = history.present;
  const previewPayload = useMemo(() => buildPreviewPayload(document), [document]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const textEditorRef = useRef<HTMLTextAreaElement | null>(null);
  const lastZoomRef = useRef(zoom);
  const [spacePressed, setSpacePressed] = useState(false);
  const [dragState, setDragState] = useState<{
    id: string;
    mode: InteractionMode;
    startX: number;
    startY: number;
    element: LabelElement;
  } | null>(null);
  const [panState, setPanState] = useState<{
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);
  const [textEditor, setTextEditor] = useState<{
    id: string;
    value: string;
  } | null>(null);

  const stageScale = EDITOR_UNIT_SCALE * zoom;

  const autosizeTextarea = useCallback(() => {
    if (!textEditorRef.current) {
      return;
    }

    textEditorRef.current.style.height = "auto";
    textEditorRef.current.style.height = `${textEditorRef.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    if (!textEditorRef.current) {
      return;
    }

    textEditorRef.current.focus();
    textEditorRef.current.setSelectionRange(
      textEditorRef.current.value.length,
      textEditorRef.current.value.length
    );
    autosizeTextarea();
  }, [autosizeTextarea, textEditor]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement) && !(event.target instanceof HTMLSelectElement)) {
        event.preventDefault();
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (selectedElementId !== textEditor?.id) {
      setTextEditor(null);
    }
  }, [selectedElementId, textEditor?.id]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const previousZoom = lastZoomRef.current;
    if (!viewport || previousZoom === zoom) {
      lastZoomRef.current = zoom;
      return;
    }

    const ratioX =
      viewport.scrollWidth > viewport.clientWidth
        ? viewport.scrollLeft / Math.max(1, viewport.scrollWidth - viewport.clientWidth)
        : 0.5;
    const ratioY =
      viewport.scrollHeight > viewport.clientHeight
        ? viewport.scrollTop / Math.max(1, viewport.scrollHeight - viewport.clientHeight)
        : 0.5;

    requestAnimationFrame(() => {
      viewport.scrollLeft = Math.max(
        0,
        ratioX * Math.max(0, viewport.scrollWidth - viewport.clientWidth)
      );
      viewport.scrollTop = Math.max(
        0,
        ratioY * Math.max(0, viewport.scrollHeight - viewport.clientHeight)
      );
    });

    lastZoomRef.current = zoom;
  }, [zoom]);

  const commitTextEditor = useCallback(() => {
    if (!textEditor) {
      return;
    }

    const target = document.elements.find((element) => element.id === textEditor.id);
    if (!isTextElement(target) || target.contentMode !== "static") {
      setTextEditor(null);
      return;
    }

    const nextHeight = measureTextElementHeight(target, textEditor.value, target.width);
    patchElement(target.id, {
      text: textEditor.value,
      height: nextHeight
    });
    markStatus("Texto atualizado");
    setTextEditor(null);
  }, [document.elements, markStatus, patchElement, textEditor]);

  const cancelTextEditor = useCallback(() => {
    setTextEditor(null);
    markStatus("Edicao de texto cancelada");
  }, [markStatus]);

  const handleViewportWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }

    event.preventDefault();
    const nextZoom = clamp(
      Number((zoom * (event.deltaY < 0 ? 1.08 : 0.92)).toFixed(2)),
      MIN_ZOOM,
      MAX_ZOOM
    );

    if (nextZoom === zoom) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) {
      setZoom(nextZoom);
      return;
    }

    const rect = viewport.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const anchorX = viewport.scrollLeft + pointerX;
    const anchorY = viewport.scrollTop + pointerY;
    const ratio = nextZoom / zoom;

    setZoom(nextZoom);

    requestAnimationFrame(() => {
      viewport.scrollLeft = anchorX * ratio - pointerX;
      viewport.scrollTop = anchorY * ratio - pointerY;
    });
  };

  const startInteraction = (
    event: PointerEvent<HTMLDivElement>,
    element: LabelElement,
    mode: InteractionMode
  ) => {
    event.stopPropagation();
    selectElement(element.id);

    if (readOnly || element.locked || event.button !== 0) {
      return;
    }

    setDragState({
      id: element.id,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      element
    });
  };

  const startTextEditing = (element: LabelElement) => {
    if (
      readOnly ||
      element.locked ||
      element.type !== "text" ||
      element.contentMode !== "static"
    ) {
      return;
    }

    selectElement(element.id);
    setTextEditor({ id: element.id, value: element.text });
  };

  const handleViewportPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.button === 1 ||
      (spacePressed && event.button === 0)
    ) {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      event.preventDefault();
      setPanState({
        startX: event.clientX,
        startY: event.clientY,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop
      });
      return;
    }

    if (event.target === event.currentTarget) {
      selectElement(undefined);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (panState) {
      event.preventDefault();
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      viewport.scrollLeft = panState.scrollLeft - (event.clientX - panState.startX);
      viewport.scrollTop = panState.scrollTop - (event.clientY - panState.startY);
      return;
    }

    if (!dragState) {
      return;
    }

    const dx = (event.clientX - dragState.startX) / stageScale;
    const dy = (event.clientY - dragState.startY) / stageScale;
    const snap = snapEnabled ? Math.max(1, gridSize) : 1;
    const snapValue = (value: number) => Math.round(value / snap) * snap;

    if (dragState.mode === "move") {
      patchElement(dragState.id, {
        x: clamp(snapValue(dragState.element.x + dx), 0, Math.max(0, document.document.width - dragState.element.width)),
        y: clamp(snapValue(dragState.element.y + dy), 0, Math.max(0, document.document.height - dragState.element.height))
      });
      return;
    }

    patchElement(dragState.id, {
      width: clamp(
        snapValue(dragState.element.width + dx),
        8,
        Math.max(8, document.document.width - dragState.element.x)
      ),
      height: clamp(
        snapValue(dragState.element.height + dy),
        dragState.element.type === "line" ? 1 : 4,
        Math.max(4, document.document.height - dragState.element.y)
      )
    });
  };

  const handlePointerFinish = () => {
    setDragState(null);
    setPanState(null);
  };

  const selectedElement = document.elements.find((element) => element.id === selectedElementId);

  return (
    <div
      ref={viewportRef}
      className="editor-canvas-viewport"
      onWheel={handleViewportWheel}
      onPointerDown={handleViewportPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerFinish}
      onPointerLeave={handlePointerFinish}
      onClick={(event) => {
        if (!panState && event.target === event.currentTarget) {
          selectElement(undefined);
        }
      }}
      style={{
        minHeight: 0,
        height: "100%",
        overflow: "auto",
        overscrollBehavior: "contain",
        cursor: panState ? "grabbing" : spacePressed ? "grab" : "default"
      }}
    >
      <div
        className="editor-canvas-workspace"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          display: "grid",
          placeItems: "center",
          padding: "48px 56px"
        }}
      >
        <div
          className="editor-canvas-surface"
          style={{
            position: "relative",
            width: document.document.width * stageScale,
            height: document.document.height * stageScale,
            background: document.document.background,
            borderRadius: 20,
            boxShadow: "0 20px 42px rgba(15, 23, 42, 0.12)",
            overflow: "hidden",
            backgroundImage: gridEnabled
              ? "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)"
              : undefined,
            backgroundSize: gridEnabled
              ? `${gridSize * stageScale}px ${gridSize * stageScale}px`
              : undefined
          }}
        >
          {[...document.elements]
            .sort((left, right) => left.zIndex - right.zIndex)
            .map((element) => {
              const selected = element.id === selectedElementId;
              const isEditing = textEditor?.id === element.id;

              return (
                <div
                  key={element.id}
                  style={getElementFrameStyle(element, stageScale, {
                    border: selected ? "1px solid #0f766e" : "1px solid transparent",
                    outline: selected ? "2px solid rgba(15, 118, 110, 0.18)" : "none",
                    borderRadius: 10,
                    cursor: readOnly ? "default" : element.locked ? "not-allowed" : "move",
                    userSelect: "none"
                  })}
                  onPointerDown={(event) => startInteraction(event, element, "move")}
                  onClick={(event) => {
                    event.stopPropagation();
                    selectElement(element.id);
                  }}
                  onDoubleClick={() => startTextEditing(element)}
                >
                  {isEditing && isTextElement(element) ? (
                    <textarea
                      ref={textEditorRef}
                      value={textEditor.value}
                      onChange={(event) => {
                        setTextEditor({ id: element.id, value: event.target.value });
                        autosizeTextarea();
                      }}
                      onBlur={commitTextEditor}
                      onClick={(event) => event.stopPropagation()}
                      onPointerDown={(event) => event.stopPropagation()}
                      onKeyDown={(event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          cancelTextEditor();
                        }

                        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                          event.preventDefault();
                          commitTextEditor();
                        }
                      }}
                      style={{
                        ...getTextElementStyle(element, stageScale),
                        minHeight: "100%",
                        resize: "none",
                        border: "none",
                        outline: "none",
                        padding: 0,
                        background: "rgba(255,255,255,0.86)",
                        overflow: "hidden"
                      }}
                    />
                  ) : (
                    <LabelElementContent
                      document={document}
                      element={element}
                      scale={stageScale}
                      previewPayload={previewPayload}
                    />
                  )}

                  {element.locked ? (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        right: -12,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background: "#0f172a",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 600
                      }}
                    >
                      Lock
                    </div>
                  ) : null}

                  {selected && !readOnly && !element.locked ? (
                    <div
                      onPointerDown={(event) => startInteraction(event, element, "resize")}
                      style={{
                        position: "absolute",
                        right: -6,
                        bottom: -6,
                        width: 14,
                        height: 14,
                        background: "var(--accent)",
                        border: "2px solid #ffffff",
                        boxShadow: "0 4px 10px rgba(15, 23, 42, 0.18)",
                        borderRadius: 999,
                        cursor: "nwse-resize"
                      }}
                    />
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>

      <div
        className="muted"
        style={{
          position: "sticky",
          left: 20,
          bottom: 20,
          width: "fit-content",
          padding: "7px 11px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.76)",
          border: "1px solid var(--line)",
          backdropFilter: "blur(10px)",
          margin: "0 0 20px 20px",
          fontSize: 12
        }}
      >
        {selectedElement
          ? `Duplo clique para editar texto, Ctrl/Cmd + roda para zoom, Space + arrastar para pan`
          : "Ctrl/Cmd + roda para zoom, Space + arrastar para pan"}
      </div>
    </div>
  );
}
