"use client";
import { useActionState } from "react";
import { sendLoginLink } from "../actions";

export default function Login() {
  const [state, action, pending] = useActionState(sendLoginLink, null);
  return (
    <main className="grid min-h-screen place-items-center bg-forest p-4">
      <form action={action} className="w-full max-w-sm rounded-3xl bg-white p-8">
        <h1 className="font-display text-2xl font-extrabold text-forest">Plant-e beheer</h1>
        <p className="mt-2 text-sm text-stone">Vul je e-mailadres in. Je ontvangt een link om in te loggen.</p>
        <label htmlFor="email" className="mt-6 block text-sm font-semibold text-forest">E-mailadres</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-lime-dark" />
        <button disabled={pending} className="mt-5 w-full rounded-full bg-forest py-3 font-bold text-white disabled:opacity-60">{pending ? "Bezig..." : "Stuur inloglink"}</button>
        {state?.msg && <p className="mt-4 text-sm text-forest">{state.msg}</p>}
      </form>
    </main>
  );
}
