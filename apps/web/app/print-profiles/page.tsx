"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardShell } from "../../components/app/dashboard-shell";
import { SessionGuard } from "../../components/app/session-guard";
import {
  createPrintProfile,
  fetchPrinters,
  fetchPrintProfiles,
  type PrintProfileItem,
  type PrinterItem
} from "../../lib/api";
import { sessionHasPermission, type ApiSession } from "../../lib/session";

export default function PrintProfilesPage() {
  const [session, setSession] = useState<ApiSession | null>(null);
  const [profiles, setProfiles] = useState<PrintProfileItem[]>([]);
  const [printers, setPrinters] = useState<PrinterItem[]>([]);
  const [form, setForm] = useState({
    printerId: "",
    name: "Padrao 100x50",
    mediaType: "label",
    darkness: 10,
    speed: 4,
    copiesDefault: 1
  });
  const canViewProfiles = sessionHasPermission(session, "print-profile.view");
  const canManageProfiles = sessionHasPermission(session, "print-profile.manage");
  const canViewPrinters = sessionHasPermission(session, "printer.view");

  const loadData = useCallback(async (activeSession: ApiSession) => {
    const [nextProfiles, nextPrinters] = await Promise.all([
      fetchPrintProfiles(activeSession),
      fetchPrinters(activeSession)
    ]);
    setProfiles(nextProfiles);
    setPrinters(nextPrinters);
    const firstPrinter = nextPrinters[0];
    if (!form.printerId && firstPrinter) {
      setForm((prev) => ({ ...prev, printerId: firstPrinter.id }));
    }
  }, [form.printerId]);

  useEffect(() => {
    if (!session || !canViewProfiles || !canViewPrinters) return;
    void loadData(session);
  }, [canViewPrinters, canViewProfiles, loadData, session]);

  return (
    <SessionGuard onSession={setSession}>
      <DashboardShell
        title="Perfis de impressao"
        subtitle="Configure perfis operacionais para impressao teste e evolucao futura de rotinas."
      >
        {!canViewProfiles ? (
          <div className="panel" style={{ padding: 24 }}>
            Seu papel atual nao possui acesso a perfis de impressao.
          </div>
        ) : null}

        <section style={{ display: "grid", gap: 18, gridTemplateColumns: "360px minmax(0, 1fr)" }}>
          {canManageProfiles ? (
            <form
              className="panel"
              style={{ padding: 20, display: "grid", gap: 12, borderRadius: 20 }}
              onSubmit={async (event) => {
                event.preventDefault();
                if (!session) return;
                await createPrintProfile(form, session);
                await loadData(session);
              }}
            >
              <strong>Novo perfil</strong>
              <select
                value={form.printerId}
                onChange={(event) => setForm((prev) => ({ ...prev, printerId: event.target.value }))}
              >
                {printers.map((printer) => (
                  <option key={printer.id} value={printer.id}>
                    {printer.name}
                  </option>
                ))}
              </select>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
              <input
                value={form.mediaType}
                onChange={(event) => setForm((prev) => ({ ...prev, mediaType: event.target.value }))}
              />
              <button type="submit">Salvar perfil</button>
            </form>
          ) : (
            <div className="panel" style={{ padding: 20, borderRadius: 20 }}>
              Seu papel pode consultar perfis, mas nao cadastrar novos.
            </div>
          )}

          <div style={{ display: "grid", gap: 14 }}>
            {canViewProfiles &&
              profiles.map((profile) => (
                <div key={profile.id} className="panel" style={{ padding: 18, borderRadius: 18 }}>
                  <strong>{profile.name}</strong>
                  <div className="muted" style={{ marginTop: 8 }}>
                    printerId: {profile.printerId} | copias: {profile.copiesDefault}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </DashboardShell>
    </SessionGuard>
  );
}
