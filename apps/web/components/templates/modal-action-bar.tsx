"use client";

export function ModalActionBar({
  canPrint,
  canSubmit,
  printing,
  quantity,
  onClose,
  onPrint
}: {
  canPrint: boolean;
  canSubmit: boolean;
  printing: boolean;
  quantity: number;
  onClose: () => void;
  onPrint: () => void;
}) {
  return (
    <footer className="model-print-action-bar">
      <div className="model-print-action-bar__copy">
        {canPrint
          ? `${quantity} etiqueta${quantity > 1 ? "s" : ""} ${quantity > 1 ? "serao enviadas" : "sera enviada"} usando a mesma base visual do preview oficial.`
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
