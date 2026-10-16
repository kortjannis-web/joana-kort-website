import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'
import { site } from '@/lib/site'

/**
 * E-Mail-Versand per SMTP (Env in Coolify setzen):
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, RECIPIENT, SMTP_REPLY_TO (Standard: site.email)
 * Optional: LEAD_WEBHOOK_URL (Make/n8n/CRM), CONFIRMATION_MAIL=false (keine Bestätigung an Interessenten)
 */
let transporter: Transporter | null | undefined

function getTransporter() {
  if (transporter !== undefined) return transporter
  if (!process.env.SMTP_HOST) {
    transporter = null
    return null
  }
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })
  return transporter
}

const FROM = () => `"${site.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER || site.email}>`
export const RECIPIENT = () => process.env.RECIPIENT || site.email
/** Antwortadresse für Mails an Interessenten (Absender ist das Website-Postfach, Antworten sollen bei Joana landen) */
export const REPLY_TO = () => process.env.SMTP_REPLY_TO || site.email
export const confirmationEnabled = () => process.env.CONFIRMATION_MAIL !== 'false'

export async function sendMail(opts: {
  to: string
  subject: string
  text: string
  replyTo?: string
  attachments?: { filename: string; content: string | Buffer; contentType?: string }[]
}) {
  const t = getTransporter()
  if (!t) {
    console.warn('[mail] SMTP nicht konfiguriert, E-Mail nicht gesendet:', opts.subject)
    return false
  }
  await t.sendMail({ from: FROM(), ...opts, replyTo: opts.replyTo || REPLY_TO() })
  return true
}

export async function webhook(payload: object) {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!r.ok) throw new Error('Webhook HTTP ' + r.status)
}

/** Benachrichtigungen dürfen das Absenden nie scheitern lassen */
export async function notifyAll(jobs: Promise<unknown>[]) {
  const res = await Promise.allSettled(jobs)
  res.forEach((r) => r.status === 'rejected' && console.error('[notify] fehlgeschlagen:', (r.reason as Error)?.message))
}

export const signature = `

Herzliche Grüße
${site.owner}

${site.name}
${site.slogan}
${site.email}`
