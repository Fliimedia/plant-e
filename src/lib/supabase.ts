import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Names as set by hand or by the Vercel Supabase integration.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

let cached: SupabaseClient | null = null;

/** Server-only client with full rights. Never expose to the browser. */
export function serviceClient(): SupabaseClient | null {
  if (!url || !service) return null;
  if (!cached) cached = createClient(url, service, { auth: { persistSession: false } });
  return cached;
}

/** Client bound to the visitor's auth cookies (used for the admin login). */
export async function authClient() {
  if (!url || !anon) return null;
  const store = await cookies();
  return createServerClient(url, anon, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* read-only context */ }
      },
    },
  });
}

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

/** Returns the logged-in admin email, or null when not allowed. */
export async function currentAdmin(): Promise<string | null> {
  const sb = await authClient();
  if (!sb) return null;
  const { data } = await sb.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email || !adminEmails().includes(email)) return null;
  return email;
}

export const supabaseConfigured = Boolean(url && anon && service);
