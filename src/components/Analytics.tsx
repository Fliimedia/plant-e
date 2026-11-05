"use client";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Site-wide listeners: e-mail and phone link clicks. */
export default function Analytics() {
  useEffect(() => {
    const on = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const h = a?.getAttribute("href") ?? "";
      if (h.startsWith("mailto:") && !h.startsWith("mailto:?")) track("contact_click", { method: "email", link_url: h });
      else if (h.startsWith("tel:")) track("contact_click", { method: "phone", link_url: h });
    };
    document.addEventListener("click", on, { capture: true });
    return () => document.removeEventListener("click", on, { capture: true });
  }, []);
  return null;
}

/** Fires one GA event when it mounts (e.g. view_item on a product page). */
export function TrackEvent({ name, params }: { name: string; params: Record<string, unknown> }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(name, params);
  }, [name, params]);
  return null;
}
