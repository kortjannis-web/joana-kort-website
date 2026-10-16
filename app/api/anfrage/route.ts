import { clientIp, isEmail, json, rateLimited, readJson, s, text } from '@/lib/server/guard'
import { RECIPIENT, REPLY_TO, confirmationEnabled, notifyAll, sendMail, signature, webhook } from '@/lib/server/mail'
import { store } from '@/lib/server/store'
import { site } from '@/lib/site'

/**
 * POST /api/anfrage: Erstgespräch, Kontakt, Warteliste (Webinar, Online-Kurs).
 * Schutz: Validierung, Rate-Limit (5/h/IP), Honeypot, Speicherung als JSONL (DATA_DIR), Mail an Joana + Bestätigung an Absender.
 * Datensparsam: keine Gesundheitsangaben, kein Geburtsdatum (nur freiwillige Altersgruppe).
 */
export const dynamic = 'force-dynamic'

type B = Record<string, unknown>
const TYPEN = ['erstgespraech', 'kontakt', 'warteliste'] as const
type Typ = (typeof TYPEN)[number]

const ANGEBOT_LABEL: Record<string, string> = { webinar: 'Online-Webinar', kurs: 'Online-Kurs', gruppe: 'Gruppenangebot' }

export async function POST(req: Request) {
  const body = (await readJson(req)) as B | null
  if (!body || typeof body !== 'object') return json({ ok: false, error: 'invalid' }, 400)
  const typ = body.typ as Typ
  if (!TYPEN.includes(typ)) return json({ ok: false, error: 'invalid' }, 400)
  if (rateLimited(clientIp(req), 'anfrage')) return json({ ok: false, error: 'rate_limit' }, 429)
  if (s(body.website)) return json({ ok: true }) // Honeypot

  const person = {
    vorname: s(body.vorname, 80),
    nachname: s(body.nachname, 80),
    email: s(body.email, 160),
    telefon: s(body.telefon, 40),
  }
  if (!person.vorname || !isEmail(person.email)) return json({ ok: false, error: 'invalid' }, 400)
  if (typ !== 'warteliste' && !person.nachname) return json({ ok: false, error: 'invalid' }, 400)
  if (body.einwilligung_dsgvo !== true) return json({ ok: false, error: 'invalid' }, 400)

  let details: Record<string, unknown> = {}
  let subject = ''
  let confirm = { subject: '', text: '' }
  const name = [person.vorname, person.nachname].filter(Boolean).join(' ')

  if (typ === 'erstgespraech') {
    details = {
      interesse: s(body.interesse, 80),
      gespraech: s(body.gespraech, 20),
      spaeter: s(body.spaeter, 20),
      beruf: s(body.beruf, 120),
      altersgruppe: s(body.alter, 30),
      zeiten: Array.isArray(body.zeiten) ? (body.zeiten as unknown[]).map((z) => s(z, 20)).filter(Boolean).slice(0, 4) : [],
      nachricht: text(body.nachricht, 1500),
    }
    if (!details.gespraech) return json({ ok: false, error: 'invalid' }, 400)
    if (details.gespraech === 'Telefon' && !person.telefon) return json({ ok: false, error: 'invalid' }, 400)
    subject = `Neue Anfrage Erstgespräch: ${details.interesse || 'Interesse offen'} (${details.gespraech})`
    confirm = {
      subject: 'Ihre Anfrage für ein Erstgespräch',
      text: `Guten Tag ${name},\n\nvielen Dank für Ihre Anfrage. Ich melde mich persönlich bei Ihnen und schlage Ihnen einen Termin für unser kostenloses Erstgespräch (etwa ${site.erstgespraechMin} Minuten, ${details.gespraech === 'Video' ? 'per Video' : 'am Telefon'}) vor.\n\nSie müssen nichts vorbereiten. Wenn Sie vorab Fragen haben, antworten Sie einfach auf diese E-Mail.${signature}`,
    }
  }

  if (typ === 'kontakt') {
    details = { anliegen: s(body.anliegen, 80), nachricht: text(body.nachricht) }
    if (!details.nachricht) return json({ ok: false, error: 'invalid' }, 400)
    subject = `Neue Nachricht: ${details.anliegen || 'Kontakt'}`
    confirm = {
      subject: 'Ihre Nachricht an Joana Kort',
      text: `Guten Tag ${name},\n\nvielen Dank für Ihre Nachricht. Ich habe sie erhalten und melde mich persönlich bei Ihnen.${signature}`,
    }
  }

  if (typ === 'warteliste') {
    const angebot = s(body.angebot, 20) ?? ''
    if (!ANGEBOT_LABEL[angebot]) return json({ ok: false, error: 'invalid' }, 400)
    details = { angebot: ANGEBOT_LABEL[angebot], nachricht: text(body.nachricht, 1000) }
    subject = `Warteliste ${details.angebot}: ${name}`
    confirm = {
      subject: `Sie stehen auf der Warteliste: ${details.angebot}`,
      text: `Guten Tag ${name},\n\nschön, dass Sie dabei sein möchten. Sie stehen auf der Warteliste für mein ${details.angebot}. Sobald Termine und Details feststehen, erfahren Sie es als Erste per E-Mail. Sie können sich jederzeit mit einer kurzen Antwort auf diese E-Mail wieder austragen.${signature}`,
    }
  }

  const record = { eingang: new Date().toISOString(), typ, person, details, seite: s(body.seite, 300) }
  try {
    await store('anfragen', record)
  } catch (e) {
    console.error('[anfrage] Speichern fehlgeschlagen:', (e as Error).message)
    return json({ ok: false }, 500)
  }

  const lines = Object.entries(details)
    .filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
  const mailText = `${subject}\n\n${name}\nE-Mail: ${person.email}\nTelefon: ${person.telefon || '-'}\n\n${lines.join('\n')}\n\nSeite: ${record.seite || '-'}\nEingang: ${record.eingang}`

  const jobs: Promise<unknown>[] = [webhook(record), sendMail({ to: RECIPIENT(), replyTo: person.email!, subject, text: mailText })]
  if (confirmationEnabled()) jobs.push(sendMail({ to: person.email!, replyTo: REPLY_TO(), ...confirm }))

  notifyAll(jobs)
  return json({ ok: true })
}
