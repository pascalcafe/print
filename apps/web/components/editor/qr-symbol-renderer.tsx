"use client";

import { QRCodeSVG } from "qrcode.react";

export type QrSymbolProps = {
  value: string;
  level?: "L" | "M" | "Q" | "H";
};

export function QrSymbolRenderer({
  value,
  level = "M"
}: QrSymbolProps) {
  return (
    <QRCodeSVG
      value={value || " "}
      level={level}
      marginSize={0}
      bgColor="#ffffff"
      fgColor="#111827"
      style={{
        width: "100%",
        height: "100%",
        display: "block"
      }}
    />
  );
}
