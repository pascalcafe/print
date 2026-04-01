import type { CSSProperties, ReactNode } from "react";

const palette: Record<string, CSSProperties> = {
  DRAFT: {
    background: "rgba(245, 158, 11, 0.12)",
    color: "#b45309"
  },
  PUBLISHED: {
    background: "rgba(15, 118, 110, 0.12)",
    color: "#0f766e"
  },
  ARCHIVED: {
    background: "rgba(100, 116, 139, 0.12)",
    color: "#475569"
  },
  QUEUED: {
    background: "rgba(59, 130, 246, 0.12)",
    color: "#1d4ed8"
  },
  RUNNING: {
    background: "rgba(14, 165, 233, 0.12)",
    color: "#0369a1"
  },
  COMPLETED: {
    background: "rgba(15, 118, 110, 0.12)",
    color: "#0f766e"
  },
  FAILED: {
    background: "rgba(239, 68, 68, 0.12)",
    color: "#b91c1c"
  },
  CANCELED: {
    background: "rgba(100, 116, 139, 0.12)",
    color: "#475569"
  },
  ACTIVE: {
    background: "rgba(34, 197, 94, 0.12)",
    color: "#15803d"
  },
  INACTIVE: {
    background: "rgba(100, 116, 139, 0.12)",
    color: "#475569"
  }
};

export function StatusBadge({
  status,
  children
}: {
  status: string;
  children?: ReactNode;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        padding: "6px 10px",
        fontSize: 12,
        fontWeight: 600,
        ...(palette[status] ?? palette.DRAFT)
      }}
    >
      {children ?? status}
    </span>
  );
}
