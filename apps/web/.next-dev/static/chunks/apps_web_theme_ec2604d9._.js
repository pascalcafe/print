(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/theme/easyprint-theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "easyPrintColors",
    ()=>easyPrintColors,
    "easyPrintTheme",
    ()=>easyPrintTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$system$40$9$2e$0$2e$0_$40$emotion$2b$_a7619d3f120e6cbfba806ef1166af431$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2f$colorManipulator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+system@9.0.0_@emotion+_a7619d3f120e6cbfba806ef1166af431/node_modules/@mui/system/colorManipulator/colorManipulator.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/styles/createTheme.mjs [app-client] (ecmascript) <export default as createTheme>");
;
const easyPrintColors = {
    primary: "#0f766e",
    primaryDark: "#0c5f58",
    primarySoft: "rgba(15, 118, 110, 0.12)",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.16)",
    background: "#eef3f8",
    surface: "#ffffff",
    surfaceSoft: "rgba(255, 255, 255, 0.86)",
    line: "rgba(15, 23, 42, 0.08)",
    text: "#111827",
    muted: "#6b7280"
};
const easyPrintTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    cssVariables: false,
    shape: {
        borderRadius: 16
    },
    spacing: 8,
    palette: {
        mode: "light",
        primary: {
            main: easyPrintColors.primary,
            dark: easyPrintColors.primaryDark
        },
        secondary: {
            main: easyPrintColors.accent
        },
        background: {
            default: easyPrintColors.background,
            paper: easyPrintColors.surface
        },
        text: {
            primary: easyPrintColors.text,
            secondary: easyPrintColors.muted
        },
        divider: easyPrintColors.line,
        success: {
            main: "#0f766e"
        },
        warning: {
            main: "#d97706"
        },
        error: {
            main: "#dc2626"
        }
    },
    typography: {
        fontFamily: 'var(--font-easyprint), "IBM Plex Sans", "Segoe UI", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em"
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em"
        },
        h3: {
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.02em"
        },
        h4: {
            fontSize: "1.3rem",
            fontWeight: 700
        },
        h5: {
            fontSize: "1.1rem",
            fontWeight: 700
        },
        subtitle1: {
            fontSize: "0.98rem",
            lineHeight: 1.6
        },
        subtitle2: {
            fontSize: "0.86rem",
            fontWeight: 600,
            letterSpacing: "0.02em"
        },
        body1: {
            fontSize: "0.96rem",
            lineHeight: 1.65
        },
        body2: {
            fontSize: "0.86rem",
            lineHeight: 1.6
        },
        button: {
            fontWeight: 700,
            letterSpacing: "0.01em",
            textTransform: "none"
        },
        overline: {
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase"
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    "--bg": easyPrintColors.background,
                    "--surface": easyPrintColors.surfaceSoft,
                    "--surface-strong": easyPrintColors.surface,
                    "--muted": easyPrintColors.muted,
                    "--text": easyPrintColors.text,
                    "--line": easyPrintColors.line,
                    "--primary": easyPrintColors.primary,
                    "--primary-soft": easyPrintColors.primarySoft,
                    "--accent": easyPrintColors.accent,
                    "--shadow": "0 20px 50px rgba(15, 23, 42, 0.08)",
                    "--radius-lg": "24px",
                    "--radius-md": "16px",
                    "--radius-sm": "12px"
                },
                "html, body": {
                    minHeight: "100%"
                },
                body: {
                    background: "\n            radial-gradient(circle at top left, rgba(15, 118, 110, 0.09), transparent 28%),\n            radial-gradient(circle at top right, rgba(245, 158, 11, 0.08), transparent 24%),\n            linear-gradient(180deg, #f9fbfd 0%, ".concat(easyPrintColors.background, " 100%)\n          "),
                    color: easyPrintColors.text
                },
                "::selection": {
                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$system$40$9$2e$0$2e$0_$40$emotion$2b$_a7619d3f120e6cbfba806ef1166af431$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2f$colorManipulator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(easyPrintColors.primary, 0.18)
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    border: "1px solid ".concat(easyPrintColors.line),
                    backgroundColor: easyPrintColors.surfaceSoft,
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    minHeight: 42,
                    borderRadius: 14,
                    paddingInline: 16
                },
                outlined: {
                    borderColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$system$40$9$2e$0$2e$0_$40$emotion$2b$_a7619d3f120e6cbfba806ef1166af431$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2f$colorManipulator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(easyPrintColors.text, 0.08)
                },
                text: {
                    color: easyPrintColors.text
                }
            },
            variants: [
                {
                    props: {
                        variant: "contained",
                        color: "primary"
                    },
                    style: {
                        background: "linear-gradient(135deg, #0f766e, #0c5f58)",
                        boxShadow: "0 14px 28px rgba(15, 118, 110, 0.18)"
                    }
                },
                {
                    props: {
                        variant: "contained",
                        color: "secondary"
                    },
                    style: {
                        background: "linear-gradient(135deg, #f59e0b, #d97706)",
                        color: "#111827",
                        boxShadow: "0 14px 28px rgba(245, 158, 11, 0.2)"
                    }
                }
            ]
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "small",
                fullWidth: true
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    backgroundColor: "#fff",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: easyPrintColors.primary,
                        borderWidth: 1
                    }
                },
                input: {
                    paddingTop: 11,
                    paddingBottom: 11
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    fontWeight: 600
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 28,
                    background: "rgba(255,255,255,0.96)",
                    backdropFilter: "blur(18px)"
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: 3,
                    borderRadius: 999,
                    backgroundColor: easyPrintColors.primary
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 44,
                    textTransform: "none",
                    fontWeight: 700
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 12,
                    backgroundColor: "#0f172a",
                    fontSize: "0.78rem"
                }
            }
        }
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/theme/easyprint-theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EasyPrintThemeProvider",
    ()=>EasyPrintThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/CssBaseline/CssBaseline.mjs [app-client] (ecmascript) <export default as CssBaseline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@mui+material@9.0.0_@emotio_95896d20ac349591eb59814cab0df443/node_modules/@mui/material/styles/ThemeProvider.mjs [app-client] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$theme$2f$easyprint$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/theme/easyprint-theme.ts [app-client] (ecmascript)");
"use client";
;
;
;
function EasyPrintThemeProvider(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$theme$2f$easyprint$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easyPrintTheme"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$14_react$2d$dom$40$19$2e$2$2e$4_react$40$19$2e$2$2e$4_$5f$react$40$19$2e$2$2e$4$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$mui$2b$material$40$9$2e$0$2e$0_$40$emotio_95896d20ac349591eb59814cab0df443$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__["CssBaseline"], {}, void 0, false, {
                fileName: "[project]/apps/web/theme/easyprint-theme-provider.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/theme/easyprint-theme-provider.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = EasyPrintThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "EasyPrintThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_theme_ec2604d9._.js.map