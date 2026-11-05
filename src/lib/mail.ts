import "server-only";

/** Sends a plain-text e-mail through Resend. Returns false when not configured or on failure. */
export async function sendMail({ to, subject, text, replyTo }: { to: string | string[]; subject: string; text: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM ?? "Plant-e website <website@plant-e.com>", to, subject, text, reply_to: replyTo }),
  }).catch(() => null);
  return Boolean(res?.ok);
}
