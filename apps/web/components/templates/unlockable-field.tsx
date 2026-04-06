"use client";

import type { ReactNode } from "react";

export function UnlockableField({
  label,
  labelFor,
  locked,
  onToggle,
  lockedHint,
  unlockedHint,
  children
}: {
  label: string;
  labelFor?: string;
  locked: boolean;
  onToggle: () => void;
  lockedHint: string;
  unlockedHint: string;
  children: ReactNode;
}) {
  return (
    <div className="unlockable-field">
      <div className="unlockable-field__header">
        <div className="unlockable-field__meta">
          <label className="unlockable-field__label" htmlFor={labelFor}>
            {label}
          </label>
          <div className="unlockable-field__hint">
            {locked ? lockedHint : unlockedHint}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="unlockable-field__toggle"
          aria-pressed={!locked}
          aria-label={locked ? `Editar ${label}` : `Fixar ${label}`}
        >
          <span className="unlockable-field__toggle-indicator" aria-hidden="true" />
          <span>{locked ? "Editar" : "Fixar"}</span>
        </button>
      </div>

      {children}
    </div>
  );
}
