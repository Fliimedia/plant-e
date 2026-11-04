"use client";
import { useRef, useState } from "react";
import { uploadImage } from "./actions";

/** Uploads a file and writes its URL into the input with id `target` (appending when `append`). */
export default function Uploader({ target, append = false, accept = "image/*" }: { target: string; append?: boolean; accept?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const onChange = async () => {
    const file = ref.current?.files?.[0];
    if (!file) return;
    setBusy(true); setMsg("");
    try {
      const fd = new FormData(); fd.set("file", file);
      const url = await uploadImage(fd);
      const el = document.getElementById(target) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el) el.value = append && el.value.trim() ? `${el.value.trim()}\n${url}` : url;
      setMsg("Geüpload");
    } catch (e) { setMsg(e instanceof Error ? e.message : "Upload mislukt"); }
    setBusy(false);
    if (ref.current) ref.current.value = "";
  };
  return (
    <span className="inline-flex items-center gap-2">
      <label className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-forest hover:bg-mist">
        {busy ? "Bezig..." : "Bestand uploaden"}
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={onChange} disabled={busy} />
      </label>
      {msg && <span className="text-xs text-stone">{msg}</span>}
    </span>
  );
}
