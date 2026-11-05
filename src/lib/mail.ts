import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

// Hostinger Email (SMTP). Only SMTP_USER and SMTP_PASS are required.
const host = process.env.SMTP_HOST || "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

export const mailConfigured = () => Boolean(user && pass);

let transport: Transporter | null = null;

/** Sends a plain-text e-mail from the site's mailbox. Returns false when not configured or on failure. */
export async function sendMail({ to, subject, text, replyTo }: { to: string | string[]; subject: string; text: string; replyTo?: string }) {
  if (!user || !pass) return false;
  transport ??= nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  try {
    await transport.sendMail({ from: process.env.MAIL_FROM || `Plant-e website <${user}>`, to, subject, text, replyTo });
    return true;
  } catch {
    return false;
  }
}
