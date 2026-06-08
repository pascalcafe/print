"use client";

import dynamic from "next/dynamic";
import type { QrSymbolProps } from "./qr-symbol-renderer";

const DynamicQrSymbolRenderer = dynamic<QrSymbolProps>(
  () => import("./qr-symbol-renderer").then((module) => module.QrSymbolRenderer),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          background:
            "repeating-linear-gradient(45deg, rgba(17,24,39,0.08) 0 6px, rgba(255,255,255,0.9) 6px 12px)"
        }}
      >
        <div
          style={{
            width: "72%",
            height: "72%",
            border: "1px solid rgba(17,24,39,0.14)",
            background: "#ffffff"
          }}
        />
      </div>
    )
  }
);

export function QrSymbol(props: QrSymbolProps) {
  return <DynamicQrSymbolRenderer {...props} />;
}
