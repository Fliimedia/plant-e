"use client";
import { useActionState, useState } from "react";
import { loginWithPassword, sendLoginLink } from "../actions";

export default function Login() {
  const [pw, pwAction, pwPending] = useActionState(loginWithPassword, null);
  const [link, linkAction, linkPending] = useActionState(sendLoginLink, null);
  const [email, setEmail] = useState("");
  const input = "mt-1 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-lime-dark";
  const label = "mt-4 block text-sm font-semibold text-forest";
  return (
    <main className="grid min-h-screen place-items-center bg-forest p-4">
      <form action={pwAction} className="w-full max-w-sm rounded-3xl bg-white p-8">
        <h1 className="font-display text-2xl font-extrabold text-forest">Plant-e beheer</h1>
        <label htmlFor="email" className={`${label} mt-6`}>E-mailadres</label>
        <input id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
        <label htmlFor="password" className={label}>Wachtwoord</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={input} />
        <button disabled={pwPending} className="mt-5 w-full rounded-full bg-forest py-3 font-bold text-white disabled:opacity-60">{pwPending ? "Bezig..." : "Inloggen"}</button>
        {pw?.msg && <p className="mt-3 text-sm text-red-700">{pw.msg}</p>}
        <div className="mt-6 border-t border-line pt-5">
          <button formAction={linkAction} formNoValidate disabled={linkPending} className="w-full rounded-full border border-forest py-3 text-sm font-bold text-forest disabled:opacity-60">{linkPending ? "Bezig..." : "Stuur inloglink (@plant-e.com)"}</button>
          {link?.msg && <p className="mt-3 text-sm text-forest">{link.msg}</p>}
        </div>
      </form>
    </main>
  );
}
