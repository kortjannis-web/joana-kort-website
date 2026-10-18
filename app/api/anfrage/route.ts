import { clientIp, isEmail, json, rateLimited, readJson, s, text } from '@/lib/server/guard'
import { RECIPIENT, REPLY_TO, confirmationEnabled, notifyAll, sendMail, signature, webhook } from '@/lib/server/mail'
import { store } from '@/lib/server/store'
import { site } from '@/lib/site'

/**
 * POST /api/anfrage: Erstgespräch (Funnel), Ergänzung zum Erstgespräch (freiwillige Angaben nach dem Absenden), Kontakt, Warteliste.
 * Erstgespräch: Name + Telefon ODER E-Mail (Schalter im Funnel), Antworten aus drei Auswahlschritten. Antwort enthält eine id für die Ergänzung.
 * Schutz: Validierung, Rate-Limit (5/h/IP), Honeypot, Speicherung als JSONL (DATA_DIR), Mail an Joana + Bestätigung an Absender.
 * Datensparsam: keine Gesundheitsangaben, kein Geburtsdatum (nur freiwillige Altersgruppe).
 */
export const dynamic = 'force-dynamic'

type B = Record<string, unknown>
const TYPEN = ['erstgespraech', 'ergaenzung', 'kontakt', 'warteliste'] as const
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
    vorname: s(body.vorname ?? body.name, 120),
    nachname: s(body.nachname, 80),
    email: s(body.email, 160),
    telefon: s(body.telefon, 40),
  }
  const funnel = typ === 'erstgespraech' || typ === 'ergaenzung'
  if (!person.vorname) return json({ ok: false, error: 'invalid' }, 400)
  // Erstgespräch: Telefon ODER E-Mail genügt (Datenschutzhinweis statt Einwilligung, Art. 6 Abs. 1 lit. b DSGVO)
  if (funnel) {
    if (person.email && !isEmail(person.email)) return json({ ok: false, error: 'invalid' }, 400)
    if (!person.email && (person.telefon ?? '').replace(/\D/g, '').length < 6) return json({ ok: false, error: 'invalid' }, 400)
  } else {
    if (!isEmail(person.email)) return json({ ok: false, error: 'invalid' }, 400)
    // Warteliste = spätere Benachrichtigung, deshalb Einwilligung. Kontakt: Hinweis genügt (Art. 6 Abs. 1 lit. b DSGVO)
    if (typ === 'warteliste' && body.einwilligung_dsgvo !== true) return json({ ok: false, error: 'invalid' }, 400)
  }
  const id = typ === 'erstgespraech' ? crypto.randomUUID() : s(body.ref, 40)

  let details: Record<string, unknown> = {}
  let subject = ''
  let confirm = { subject: '', text: '' }
  const name = [person.vorname, person.nachname].filter(Boolean).join(' ')

  if (typ === 'erstgespraech') {
    details = {
      fuer: s(body.fuer, 80),
      situation: s(body.situation, 120),
      umfang: s(body.umfang, 120),
      interesse: s(body.interesse, 80),
      kontaktweg: s(body.kontaktweg, 20),
    }
    if (details.kontaktweg !== 'Telefon' && details.kontaktweg !== 'E-Mail') return json({ ok: false, error: 'invalid' }, 400)
    if (details.kontaktweg === 'Telefon' && !person.telefon) return json({ ok: false, error: 'invalid' }, 400)
    if (details.kontaktweg === 'E-Mail' && !person.email) return json({ ok: false, error: 'invalid' }, 400)
    subject = `Neue Anfrage Erstgespräch: ${details.interesse || details.fuer || 'Interesse offen'} (${details.kontaktweg === 'Telefon' ? 'bitte anrufen' : 'per E-Mail'})`
    confirm = {
      subject: 'Ihre Anfrage für ein kostenloses Erstgespräch',
      text: `Guten Tag ${name},\n\nvielen Dank für Ihre Anfrage. Ich melde mich persönlich bei Ihnen und wir vereinbaren unser kostenloses Erstgespräch (etwa ${site.erstgespraechMin} Minuten). Darin klären wir Ihr Anliegen und ich empfehle Ihnen den Weg, der zu Ihnen passt.\n\nSie müssen nichts vorbereiten. Wenn Sie vorab Fragen haben, antworten Sie einfach auf diese E-Mail.${signature}`,
    }
  }

  if (typ === 'ergaenzung') {
    details = {
      anfrage: id,
      beruf: s(body.beruf, 120),
      altersgruppe: s(body.alter, 30),
      ort: s(body.ort, 30),
      zeiten: Array.isArray(body.zeiten) ? (body.zeiten as unknown[]).map((z) => s(z, 20)).filter(Boolean).slice(0, 4) : [],
      nachricht: text(body.nachricht, 1500),
    }
    if (!id) return json({ ok: false, error: 'invalid' }, 400)
    subject = `Ergänzung zur Anfrage Erstgespräch: ${name}`
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

  const record = { id, eingang: new Date().toISOString(), typ, person, details, seite: s(body.seite, 300) }
  try {
    await store('anfragen', record)
  } catch (e) {
    console.error('[anfrage] Speichern fehlgeschlagen:', (e as Error).message)
    return json({ ok: false }, 500)
  }

  const lines = Object.entries(details)
    .filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
  const mailText = `${subject}\n\n${name}\nE-Mail: ${person.email || '-'}\nTelefon: ${person.telefon || '-'}\n\n${lines.join('\n')}\n\nSeite: ${record.seite || '-'}\nEingang: ${record.eingang}`

  const jobs: Promise<unknown>[] = [webhook(record), sendMail({ to: RECIPIENT(), replyTo: person.email || undefined, subject, text: mailText })]
  // Bestätigung nur, wenn eine E-Mail-Adresse vorliegt (Erstgespräch mit Telefon: Joana ruft an), nie für die Ergänzung
  if (confirmationEnabled() && person.email && confirm.subject) jobs.push(sendMail({ to: person.email, replyTo: REPLY_TO(), ...confirm }))

  notifyAll(jobs)
  return json({ ok: true, id })
}
