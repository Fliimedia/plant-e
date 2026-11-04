"use client";
import { useState } from "react";
import { migrateMedia } from "../actions";

export default function MediaMigrator({ paths }: { paths: string[] }) {
  const [done, setDone] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true); setDone(0); setFailed([]);
    const fails: string[] = [];
    for (let i = 0; i < paths.length; i += 15) {
      const r = await migrateMedia(paths.slice(i, i + 15)).catch(() => ({ ok: 0, failed: paths.slice(i, i + 15) }));
      fails.push(...r.failed);
      setDone(Math.min(paths.length, i + 15)); setFailed([...fails]);
    }
    setBusy(false);
  };
  return (
    <div>
      <button onClick={run} disabled={busy} className="rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{busy ? `Bezig... ${done}/${paths.length}` : "Start overzetten"}</button>
      {!busy && done > 0 && <p className="mt-3 text-sm text-forest">Klaar: {done - failed.length} gelukt, {failed.length} niet gevonden.</p>}
      {failed.length > 0 && <details className="mt-2 text-xs text-stone"><summary>Niet gevonden</summary><ul>{failed.map((f) => <li key={f}>{f}</li>)}</ul></details>}
    </div>
  );
}
