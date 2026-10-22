import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Img } from './images'

/**
 * Foto von Joana (Porträt): erscheint im Video-Feld "Lernen Sie mich kennen" (mit leuchtendem Play-Knopf) und bei "Ich bin Joana Kort".
 * Datei einfach als public/images/joana-kort.webp ablegen (Hochformat, etwa 1200 × 1500, WebP Qualität 82), sonst Platzhalter.
 * Nur in Server-Komponenten importieren (liest das Dateisystem).
 */
const PORTRAIT_SRC = '/images/joana-kort.webp'
export const PORTRAIT: Img | null = existsSync(join(process.cwd(), 'public', PORTRAIT_SRC))
  ? { src: PORTRAIT_SRC, alt: 'Joana Kort, Stressberaterin aus Gummersbach', w: 1200, h: 1500 }
  : null
