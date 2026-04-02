"use client";

export function ModalActionBar({
  canPrint,
  canSubmit,
  printing,
  onClose,
  onPrint
}: {
  canPrint: boolean;
  canSubmit: boolean;
  printing: boolean;
  onClose: () => void;
  onPrint: () => void;
}) {
  return (
    <footer className="model-print-action-bar">
      <div className="model-print-action-bar__copy">
        {canPrint
          ? "Os dados preenchidos entram no payload do modelo e seguem apenas com a area util da etiqueta."
          : "Seu papel atual permite consultar o modelo, mas nao disparar impressao."}
      </div>

      <div className="model-print-action-bar__buttons">
        <button type="button" className="model-print-action-bar__secondary" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="button"
          className="model-print-action-bar__primary"
          disabled={!canSubmit}
          onClick={onPrint}
        >
          {printing ? "Imprimindo..." : "IMPRIMIR"}
        </button>
      </div>
    </footer>
  );
}
