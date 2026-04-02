"use client";

import type { QuickPrintFormValues } from "../../lib/template-library";
import { UnlockableField } from "./unlockable-field";

export function ModelPrintForm({
  form,
  templateId,
  categoryLabel,
  responsibleLocked,
  manufacturedLocked,
  expiresLocked,
  routeDescription,
  routeHint,
  error,
  onFieldChange,
  onToggleResponsible,
  onToggleManufactured,
  onToggleExpires
}: {
  form: QuickPrintFormValues;
  templateId: string;
  categoryLabel: string;
  responsibleLocked: boolean;
  manufacturedLocked: boolean;
  expiresLocked: boolean;
  routeDescription: string;
  routeHint: string;
  error: string | null;
  onFieldChange: <TKey extends keyof QuickPrintFormValues>(
    key: TKey,
    value: QuickPrintFormValues[TKey]
  ) => void;
  onToggleResponsible: () => void;
  onToggleManufactured: () => void;
  onToggleExpires: () => void;
}) {
  const fieldPrefix = `model-print-${templateId}`;

  return (
    <>
      <section className="model-print-form__section">
        <div className="model-print-form__section-header">
          <strong>Preenchimento operacional</strong>
          <div className="muted" style={{ fontSize: 13 }}>
            Revise apenas o necessario e mantenha a impressao fluindo com o minimo de atrito.
          </div>
        </div>

        <div className="model-print-form__content">
          <div className="model-print-form__field">
            <label className="model-print-form__label" htmlFor={`${fieldPrefix}-product`}>
              Nome do produto
            </label>
            <input
              id={`${fieldPrefix}-product`}
              value={form.productName}
              onChange={(event) => onFieldChange("productName", event.target.value)}
              placeholder="Ex.: Brigadeiro gourmet"
            />
          </div>

          <UnlockableField
            label="Nome do responsavel"
            labelFor={`${fieldPrefix}-responsible`}
            locked={responsibleLocked}
            onToggle={onToggleResponsible}
            lockedHint={`Preenchido automaticamente para ${categoryLabel.toLowerCase()}.`}
            unlockedHint="Edicao manual habilitada para este lote."
          >
            <input
              id={`${fieldPrefix}-responsible`}
              value={form.responsibleName}
              disabled={responsibleLocked}
              onChange={(event) => onFieldChange("responsibleName", event.target.value)}
            />
          </UnlockableField>

          <div className="model-print-form__grid">
            <UnlockableField
              label="Data de fabricacao"
              labelFor={`${fieldPrefix}-manufactured`}
              locked={manufacturedLocked}
              onToggle={onToggleManufactured}
              lockedHint="Usa a data local atual no momento da abertura."
              unlockedHint="Ao editar a fabricacao, a validade acompanha se permanecer fixa."
            >
              <input
                id={`${fieldPrefix}-manufactured`}
                type="date"
                value={form.manufacturedAt}
                disabled={manufacturedLocked}
                onChange={(event) => onFieldChange("manufacturedAt", event.target.value)}
              />
            </UnlockableField>

            <UnlockableField
              label="Data de validade"
              labelFor={`${fieldPrefix}-expires`}
              locked={expiresLocked}
              onToggle={onToggleExpires}
              lockedHint="Calculada automaticamente como fabricacao + 2 dias."
              unlockedHint="Edicao manual habilitada para este lote."
            >
              <input
                id={`${fieldPrefix}-expires`}
                type="date"
                value={form.expiresAt}
                disabled={expiresLocked}
                onChange={(event) => onFieldChange("expiresAt", event.target.value)}
              />
            </UnlockableField>
          </div>

          <div className="model-print-form__field model-print-form__field--compact">
            <label className="model-print-form__label" htmlFor={`${fieldPrefix}-quantity`}>
              Quantidade de etiquetas
            </label>
            <input
              id={`${fieldPrefix}-quantity`}
              type="number"
              min={1}
              value={form.quantity}
              onChange={(event) =>
                onFieldChange("quantity", Math.max(1, Number(event.target.value) || 1))
              }
            />
          </div>
        </div>
      </section>

      <section className="model-print-form__section model-print-form__section--muted">
        <div className="model-print-form__section-header">
          <strong>Destino operacional</strong>
          <div className="muted" style={{ fontSize: 13 }}>
            O fluxo rapido escolhe uma rota pronta sem obrigar o operador a navegar por outras
            telas.
          </div>
        </div>

        <div className="model-print-route">
          <div className="model-print-route__label">Rota selecionada</div>
          <div className="model-print-route__value">{routeDescription}</div>
          <div className="model-print-route__hint">{routeHint}</div>
        </div>

        {error ? <div className="model-print-form__error">{error}</div> : null}
      </section>
    </>
  );
}
