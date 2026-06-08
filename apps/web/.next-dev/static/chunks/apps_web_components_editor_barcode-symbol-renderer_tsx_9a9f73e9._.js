(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarcodeSymbolRenderer",
    ()=>BarcodeSymbolRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsbarcode$40$3$2e$12$2e$3$2f$node_modules$2f$jsbarcode$2f$bin$2f$JsBarcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsbarcode@3.12.3/node_modules/jsbarcode/bin/JsBarcode.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const JS_BARCODE_FORMAT = {
    CODE128: "CODE128",
    EAN13: "EAN13",
    EAN8: "EAN8"
};
function BarcodeSymbolRenderer(param) {
    let { value, format, showHumanReadable = true, physical = false } = param;
    _s();
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [renderError, setRenderError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BarcodeSymbolRenderer.useEffect": ()=>{
            if (!svgRef.current) {
                return;
            }
            setRenderError(null);
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsbarcode$40$3$2e$12$2e$3$2f$node_modules$2f$jsbarcode$2f$bin$2f$JsBarcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(svgRef.current, value, {
                    format: JS_BARCODE_FORMAT[format],
                    displayValue: showHumanReadable,
                    text: value,
                    lineColor: "#000000",
                    background: "#ffffff",
                    margin: physical ? 6 : 10,
                    width: physical ? 1.4 : 2,
                    height: physical ? 38 : 48,
                    fontSize: physical ? 12 : 14,
                    fontOptions: "bold",
                    textMargin: 2
                });
            } catch (e) {
                setRenderError("Codigo invalido para o formato selecionado.");
            }
        }
    }["BarcodeSymbolRenderer.useEffect"], [
        format,
        physical,
        showHumanReadable,
        value
    ]);
    if (renderError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                height: "100%",
                display: "grid",
                placeItems: "center",
                padding: 4,
                border: "1px solid #b91c1c",
                background: "#fff5f5",
                color: "#991b1b",
                fontSize: 10,
                fontWeight: 700,
                textAlign: "center"
            },
            children: renderError
        }, void 0, false, {
            fileName: "[project]/apps/web/components/editor/barcode-symbol-renderer.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ref: svgRef,
        role: "img",
        "aria-label": "Codigo de barras ".concat(value),
        style: {
            width: "100%",
            height: "100%",
            display: "block",
            background: "#ffffff"
        }
    }, void 0, false, {
        fileName: "[project]/apps/web/components/editor/barcode-symbol-renderer.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(BarcodeSymbolRenderer, "TQexM7ASeGqrx4cF8Ct92KW/mVs=");
_c = BarcodeSymbolRenderer;
var _c;
__turbopack_context__.k.register(_c, "BarcodeSymbolRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/web/components/editor/barcode-symbol-renderer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=apps_web_components_editor_barcode-symbol-renderer_tsx_9a9f73e9._.js.map