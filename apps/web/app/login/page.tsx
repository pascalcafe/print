"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSsoProviders, login, startOidcLogin, type PublicIdentityProviderItem } from "../../lib/api";
import { storeSession } from "../../lib/session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@easyprint.local");
  const [password, setPassword] = useState("EasyPrint123!");
  const [tenantSlug, setTenantSlug] = useState("default");
  const [loading, setLoading] = useState(false);
  const [oidcLoading, setOidcLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<PublicIdentityProviderItem[]>([]);

  useEffect(() => {
    let active = true;

    const loadProviders = async () => {
      try {
        const nextProviders = await fetchSsoProviders(tenantSlug);
        if (!active) return;
        setProviders(nextProviders);
      } catch {
        if (!active) return;
        setProviders([]);
      }
    };

    void loadProviders();

    return () => {
      active = false;
    };
  }, [tenantSlug]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = await login(email, password);
      storeSession(session);
      router.replace("/");
    } catch {
      setError("Nao foi possivel autenticar");
    } finally {
      setLoading(false);
    }
  };

  const handleOidcLogin = async (providerSlug: string) => {
    setOidcLoading(providerSlug);
    setError(null);

    try {
      const response = await startOidcLogin(providerSlug, {
        tenantSlug,
        redirectUri: `${window.location.origin}/login/callback/oidc`
      });
      window.localStorage.setItem("easyprint:oidc-provider", providerSlug);
      window.location.href = response.authorizationUrl;
    } catch {
      setError("Nao foi possivel iniciar o login corporativo");
      setOidcLoading(null);
    }
  };

  return (
    <main className="shell" style={{ display: "grid", placeItems: "center" }}>
      <section className="panel" style={{ width: "min(480px, 100%)", padding: 28, display: "grid", gap: 18 }}>
        <div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
            EasyPrint / Acesso
          </div>
          <h1 style={{ margin: 0 }}>Entrar no EasyPrint</h1>
          <p className="muted" style={{ margin: "10px 0 0" }}>
            Use o acesso local bootstrap ou um provider corporativo do seu tenant.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Tenant
            </div>
            <input
              value={tenantSlug}
              onChange={(event) => setTenantSlug(event.target.value || "default")}
            />
          </label>

          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              E-mail
            </div>
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>

          <label>
            <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
              Senha
            </div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error ? <div style={{ color: "#b91c1c", fontSize: 14 }}>{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "var(--primary)",
              color: "#fff",
              border: "none"
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {providers.length > 0 ? (
          <section
            style={{
              display: "grid",
              gap: 10,
              paddingTop: 8,
              borderTop: "1px solid var(--line)"
            }}
          >
            <div className="muted" style={{ fontSize: 12 }}>
              Login corporativo
            </div>
            {providers.map((provider) => (
              <button
                key={provider.slug}
                type="button"
                disabled={oidcLoading === provider.slug}
                onClick={() => void handleOidcLogin(provider.slug)}
                style={{
                  background: "rgba(15,118,110,0.08)",
                  color: "var(--primary)",
                  border: "1px solid rgba(15,118,110,0.18)"
                }}
              >
                {oidcLoading === provider.slug
                  ? `Conectando em ${provider.name}...`
                  : `Entrar com ${provider.name}`}
              </button>
            ))}
          </section>
        ) : null}
      </section>
    </main>
  );
}
