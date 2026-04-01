"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchMe } from "../../lib/api";
import {
  clearSession,
  loadStoredSession,
  storeSession,
  type ApiSession
} from "../../lib/session";

export function SessionGuard({
  children,
  onSession
}: {
  children: ReactNode;
  onSession?: (session: ApiSession) => void;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const bootstrapSession = async () => {
      const storedSession = loadStoredSession();
      if (!storedSession) {
        router.replace("/login");
        return;
      }

      try {
        const refreshedSession = {
          accessToken: storedSession.accessToken,
          session: await fetchMe(storedSession)
        };

        storeSession(refreshedSession);
        if (!active) return;
        onSession?.(refreshedSession);
        setReady(true);
      } catch {
        clearSession();
        if (!active) return;
        router.replace("/login");
      }
    };

    void bootstrapSession();

    return () => {
      active = false;
    };
  }, [onSession, router]);

  if (!ready) {
    return (
      <main className="shell" style={{ display: "grid", placeItems: "center" }}>
        <div className="panel" style={{ padding: 24 }}>
          Carregando sessao...
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
