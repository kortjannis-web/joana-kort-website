import { ROLE } from '@/lib/site'

/**
 * Qualifikationen und Referenzen (Seite /qualifikationen-und-referenzen/).
 *
 * So ergänzen Sie Einträge:
 * - Einfach ein Objekt in das passende Array schreiben, die Seite zeigt es beim nächsten Build automatisch an.
 * - Leere Arrays blenden ihre Section komplett aus (keine Platzhalter auf der Live-Seite). Erst eintragen, wenn es stimmt.
 * - Reihenfolge: neueste zuerst.
 * - QUALIFIKATIONEN: Studium, Ausbildungen, Zertifikate. Laufendes immer mit status 'laufend' und den voraussichtlichen
 *   Abschluss in `zeitraum` (z. B. 'seit 2025, Abschluss voraussichtlich Herbst 2027'). Die Seite zeigt dann sichtbar das Badge "Laufend".
 *   Beispiel: { titel: 'Zertifikat Entspannungstrainerin', institution: 'Name der Akademie', zeitraum: '2027', status: 'abgeschlossen' }
 * - FORTBILDUNGEN: kürzere Kurse und Weiterbildungen.
 *   Beispiel: { titel: 'Achtsamkeit im Arbeitsalltag', einrichtung: 'Name der Einrichtung', jahr: '2027' }
 * - TRAININGS: Schulungen, Workshops und Vorträge, die Joana selbst gehalten hat (Referenzen). Nur mit Erlaubnis der Einrichtung nennen.
 *   Beispiel: { titel: 'Stress im Team verstehen', einrichtung: 'Firma XY, Gummersbach', jahr: '2027', beschreibung: 'Halbtägige Schulung für 12 Mitarbeitende' }
 * - FOTOS: Fotos aus Schulungen oder der Arbeit, Dateien nach public/images/referenzen/ legen (WebP, ca. 1200 px breit).
 *   Nur Fotos, für die alle abgebildeten Personen zugestimmt haben.
 *   Beispiel: { src: '/images/referenzen/schulung-2027.webp', alt: 'Joana Kort erklärt einem Team das Stressmodell', width: 1200, height: 800 }
 * - Kundenstimmen kommen aus lib/content/reviews.ts (REVIEWS), nicht von hier.
 */

export type Qualifikation = {
  titel: string
  institution?: string
  /** Sichtbare Zeitangabe, z. B. '2021 bis 2024' oder bei laufenden 'Abschluss voraussichtlich Sommer 2027' */
  zeitraum: string
  /** 'laufend' = Badge "Laufend" (Pflicht für alles, was noch nicht abgeschlossen ist) */
  status: 'abgeschlossen' | 'laufend'
  beschreibung?: string
}

export type Fortbildung = {
  titel: string
  /** Ort oder Einrichtung */
  einrichtung?: string
  jahr: string
  beschreibung?: string
}

export type Training = {
  titel: string
  /** Ort oder Einrichtung, z. B. 'Firma XY, Gummersbach' */
  einrichtung: string
  jahr: string
  beschreibung?: string
}

export type Foto = { src: string; alt: string; width: number; height: number; caption?: string }

/**
 * Studium: Stand und Abschlusstermin kommen aus lib/site.ts (ROLE, Schalter STUDIUM_ABGESCHLOSSEN, ABSCHLUSS_TERMIN),
 * damit Berufsbezeichnung und diese Seite nie auseinanderlaufen.
 */
const STUDIUM_LAEUFT = ROLE.background.includes('voraussichtlich')
const ABSCHLUSS_TERMIN = ROLE.background.match(/voraussichtlich ([^)]+)\)/)?.[1]
const ABSCHLUSS_GRAD = STUDIUM_LAEUFT ? undefined : ROLE.background.match(/\(([^)]+)\)/)?.[1]

export const QUALIFIKATIONEN: Qualifikation[] = [
  {
    titel: ABSCHLUSS_GRAD ? `Studium der Gesundheitspsychologie (${ABSCHLUSS_GRAD})` : 'Studium der Gesundheitspsychologie',
    // PRÜFEN: Hochschule ergänzen (institution: '…'), auf Wunsch Studienbeginn vor den Abschluss setzen (z. B. 'seit 2023, Abschluss …').
    // Nach dem Abschluss (STUDIUM_ABGESCHLOSSEN in lib/site.ts) hier das Jahr eintragen, z. B. 'Abschluss 2027'
    zeitraum: STUDIUM_LAEUFT ? (ABSCHLUSS_TERMIN ? `Abschluss voraussichtlich ${ABSCHLUSS_TERMIN}` : 'Studium läuft') : 'Abgeschlossen',
    status: STUDIUM_LAEUFT ? 'laufend' : 'abgeschlossen',
    beschreibung:
      'Wie Stress entsteht, wie er auf Körper, Gedanken und Verhalten wirkt und was Menschen hilft, gesund damit umzugehen. Mein beruflicher Schwerpunkt: Stress.',
  },
]

export const FORTBILDUNGEN: Fortbildung[] = []

export const TRAININGS: Training[] = []

export const FOTOS: Foto[] = []
