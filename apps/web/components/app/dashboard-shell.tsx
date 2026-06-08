"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  clearSession,
  loadStoredSession,
  sessionHasPermission
} from "../../lib/session";

const items = [
  { href: "/", label: "Templates", permission: "template.view" as const },
  { href: "/identity", label: "Identidade", permission: "identity.view" as const },
  { href: "/agents", label: "Agentes", permission: "agent.view" as const },
  { href: "/printers", label: "Impressoras", permission: "printer.view" as const },
  {
    href: "/print-profiles",
    label: "Perfis",
    permission: "print-profile.view" as const
  },
  { href: "/jobs", label: "Jobs", permission: "print-job.view" as const },
  { href: "/audit", label: "Auditoria", permission: "audit.view" as const },
  { href: "/observability", label: "Observabilidade", permission: "observability.view" as const }
];

export function DashboardShell({
  title,
  subtitle,
  action,
  children
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const session = loadStoredSession();
  const visibleItems = items.filter((item) => sessionHasPermission(session, item.permission));

  return (
    <main className="shell">
      <section className="panel" style={{ padding: 24, display: "grid", gap: 24 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-start"
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <nav style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {visibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    background:
                      pathname === item.href ? "var(--primary-soft)" : "rgba(255,255,255,0.7)",
                    color: pathname === item.href ? "var(--primary)" : "var(--muted)",
                    fontWeight: 600
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div>
              <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
                EasyPrint / Marco 4
              </div>
              <h1 style={{ margin: 0, fontSize: 34 }}>{title}</h1>
              <p className="muted" style={{ margin: "10px 0 0", maxWidth: 760 }}>
                {subtitle}
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12, justifyItems: "end" }}>
            <div className="muted" style={{ fontSize: 13 }}>
              {session?.session.name ?? "Usuario"} | {session?.session.roleName ?? "Papel"} |{" "}
              {session?.session.tenantSlug ?? "tenant"} |{" "}
              {session?.session.authMethod === "oidc"
                ? session?.session.externalProviderName ?? "SSO"
                : "Local"}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "end" }}>
              {action}
              <button
                onClick={() => {
                  clearSession();
                  router.replace("/login");
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
