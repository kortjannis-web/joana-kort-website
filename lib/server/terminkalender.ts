import 'server-only'
import { site } from '@/lib/site'

/**
 * Anbindung an Joanas Terminkalender (Burocalendar, eigene Instanz z. B. termine.joana-stressberatung.de).
 * Jede Anfrage aus den Formularen wird dort als Kontakt angelegt (Name, E-Mail, Telefon, Antworten als Notiz, Schlagwörter),
 * damit Joana daraus mit einem Klick einen Termin eintragen oder einen persönlichen Buchungslink schicken kann.
 * Env (nur Server, in Coolify): BUROCALENDAR_API_KEY (Einstellungen → API & Webhooks). Adresse = Herkunft von NEXT_PUBLIC_BOOKING_URL,
 * abweichend BUROCALENDAR_URL. Ohne Schlüssel keine Übertragung. Die Ergänzung nach dem Absenden geht nur per Mail (sie würde sonst einen zweiten Kontakt anlegen).
 */
const origin = (u: string) => {
  try {
    return new URL(u).origin
  } catch {
    return ''
  }
}
const BASE = () => (process.env.BUROCALENDAR_URL || origin(site.bookingUrl)).replace(/\/+$/, '')
const KEY = () => process.env.BUROCALENDAR_API_KEY || ''

export const terminkalenderEnabled = () => !!(BASE() && KEY())

type Kontakt = { name: string; email?: string | null; telefon?: string | null; tags: string[]; notiz: string }

const post = (c: Kontakt, mitTelefon: boolean) =>
  fetch(`${BASE()}/api/admin/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: c.name.slice(0, 200),
      email: c.email || undefined,
      phone: (mitTelefon && c.telefon) || undefined,
      tags: c.tags.map((t) => t.slice(0, 50)).slice(0, 30),
      notes: c.notiz.slice(0, 10000),
    }),
    signal: AbortSignal.timeout(10000),
  })

export async function kontaktAnlegen(c: Kontakt) {
  if (!terminkalenderEnabled()) return
  let r = await post(c, true)
  // Ungültige Telefonnummer lehnt der Kalender ab: dann ohne Nummer anlegen (sie steht in der Notiz)
  if (r.status === 400 && c.telefon) r = await post(c, false)
  if (!r.ok) throw new Error('Terminkalender HTTP ' + r.status + ' ' + (await r.text().catch(() => '')).slice(0, 200))
}
