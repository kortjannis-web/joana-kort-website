import 'server-only'

/* Gemeinsame Prüfungen für alle Formular-Endpunkte (aus server.js des Leadgenerators übernommen). */

const RATE_MAX = 5
const RATE_WINDOW = 60 * 60 * 1000
const hits = new Map<string, number[]>()

/** true = gebremst (mehr als 5 Anfragen pro Stunde und IP und Endpunkt, oder `max`) */
export function rateLimited(ip: string, bucket: string, max = RATE_MAX) {
  const key = bucket + ':' + ip
  const now = Date.now()
  const arr = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW)
  arr.push(now)
  hits.set(key, arr)
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW)) hits.delete(k)
  return arr.length > max
}

export function clientIp(req: Request) {
  const xff = req.headers.get('x-forwarded-for')
  return (xff ? xff.split(',')[0].trim() : req.headers.get('x-real-ip')) || 'unknown'
}

export const MAX_BODY = 20 * 1024

export async function readJson(req: Request): Promise<unknown | null> {
  const len = Number(req.headers.get('content-length') || 0)
  if (len > MAX_BODY) return null
  try {
    const text = await req.text()
    if (text.length > MAX_BODY) return null
    return JSON.parse(text)
  } catch {
    return null
  }
}

/** String säubern: Steuerzeichen raus, trimmen, kürzen. Kein String = null */
export const s = (v: unknown, max = 200): string | null =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max) || null : null

/** Mehrzeiliger Text (Nachrichten): Zeilenumbrüche erlaubt */
export const text = (v: unknown, max = 3000): string | null =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max) || null : null

export const n = (v: unknown, lo: number, hi: number): number | null =>
  typeof v === 'number' && isFinite(v) && v >= lo && v <= hi ? v : null

export const isEmail = (v: string | null) => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
