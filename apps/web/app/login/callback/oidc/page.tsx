"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exchangeOidcLogin } from "../../../../lib/api";
import { storeSession } from "../../../../lib/session";

function OidcCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const state = searchParams.get("state");
      const code = searchParams.get("code");

      const providerSlug = searchParams.get("provider") ?? window.localStorage.getItem("easyprint:oidc-provider") ?? "";
      if (!state || !code || !providerSlug) {
        if (!active) return;
        setError("Callback corporativo incompleto");
        return;
      }

      try {
        const session = await exchangeOidcLogin(providerSlug, {
          state,
          code,
          redirectUri: `${window.location.origin}/login/callback/oidc`
        });
        window.localStorage.removeItem("easyprint:oidc-provider");
        storeSession(session);
        router.replace("/");
      } catch {
        if (!active) return;
        setError("Nao foi possivel concluir o login corporativo");
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return (
    <main className="shell" style={{ display: "grid", placeItems: "center" }}>
      <section className="panel" style={{ width: "min(480px, 100%)", padding: 28, display: "grid", gap: 14 }}>
        <strong>Autenticacao corporativa</strong>
        <div className="muted">
          {error ?? "Concluindo autenticacao corporativa e preparando sua sessao..."}
        </div>
      </section>
    </main>
  );
}

export default function OidcCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="shell" style={{ display: "grid", placeItems: "center" }}>
          <section
            className="panel"
            style={{ width: "min(480px, 100%)", padding: 28, display: "grid", gap: 14 }}
          >
            <strong>Autenticacao corporativa</strong>
            <div className="muted">Preparando callback do login corporativo...</div>
          </section>
        </main>
      }
    >
      <OidcCallbackContent />
    </Suspense>
  );
}
