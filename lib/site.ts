/**
 * Zentrale Stammdaten. Einzige Quelle für Name, Kontakt, Region und Schalter.
 * Muss identisch sein mit Impressum, Schema, Google-Unternehmensprofil und Verzeichnissen.
 * PRÜFEN-Werte stehen auch in docs/OFFENE-PUNKTE.md.
 */

/** Domain ohne Schrägstrich am Ende. PRÜFEN: endgültige Domain eintragen (Coolify: NEXT_PUBLIC_SITE_URL) */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joana-kort.de').replace(/\/$/, '')

/** Vorschau-Deploys nicht indexieren: NEXT_PUBLIC_INDEXABLE=true nur auf der echten Domain setzen. */
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === 'true'

/**
 * Berufsbezeichnung. Während des Studiums bewusst ohne Titel "Gesundheitspsychologin", damit nichts nach einem
 * Abschluss klingt, der noch nicht vorliegt. Nach dem Abschluss: STUDIUM_ABGESCHLOSSEN = true und ABSCHLUSS eintragen,
 * dann ändern sich alle Stellen (Hero-Zeile, Über mich, Schema, Footer) automatisch.
 */
const STUDIUM_ABGESCHLOSSEN = false
/** PRÜFEN: genauer Abschluss (z. B. "B.Sc." oder "M.Sc.") */
const ABSCHLUSS = 'B.Sc.'
/** PRÜFEN: voraussichtlicher Abschluss */
const ABSCHLUSS_TERMIN = 'Sommer 2027'

export const ROLE = STUDIUM_ABGESCHLOSSEN
  ? {
      /** Kurz, z. B. unter dem Namen */
      short: 'Gesundheitspsychologin mit Schwerpunkt Stress',
      /** Ausführlich (Über mich, Schema) */
      long: `Gesundheitspsychologin (${ABSCHLUSS}) mit Schwerpunkt Stress`,
      /** Fachlicher Hintergrund in einem Satz */
      background: `Abgeschlossenes Studium der Gesundheitspsychologie (${ABSCHLUSS}), beruflicher Schwerpunkt: Stress`,
      jobTitle: 'Gesundheitspsychologin',
    }
  : {
      short: 'Stressberaterin mit gesundheitspsychologischem Hintergrund',
      long: 'Stressberaterin und angehende Gesundheitspsychologin',
      background: `Studium der Gesundheitspsychologie (Abschluss voraussichtlich ${ABSCHLUSS_TERMIN}), beruflicher Schwerpunkt: Stress`,
      jobTitle: 'Stressberaterin',
    }

export const site = {
  name: 'Joana Kort Stressberatung',
  owner: 'Joana Kort',
  slogan: 'Stress verstehen. Stress bewältigen. Stress managen.',
  /** PRÜFEN: Anschrift für Impressum (ladungsfähig). Leer = im Impressum steht ein Platzhalter */
  address: {
    street: process.env.NEXT_PUBLIC_STREET || '',
    zip: process.env.NEXT_PUBLIC_ZIP || '51643',
    city: 'Gummersbach',
    county: 'Oberbergischer Kreis',
    region: 'Nordrhein-Westfalen',
    country: 'DE',
  },
  /** Mittelpunkt des Vor-Ort-Gebiets (Gummersbach), Radius etwa 20 km */
  geo: { lat: 51.0266, lng: 7.5652 },
  radiusKm: 20,
  /** PRÜFEN: E-Mail-Adresse */
  email: process.env.NEXT_PUBLIC_EMAIL || 'kontakt@joana-kort.de',
  /** Optional: Telefon. Leer = kein Telefon auf der Website (Kontakt per E-Mail und Formular) */
  phone: process.env.NEXT_PUBLIC_PHONE
    ? {
        display: process.env.NEXT_PUBLIC_PHONE,
        href: `tel:${process.env.NEXT_PUBLIC_PHONE.replace(/[^\d+]/g, '').replace(/^0/, '+49')}`,
      }
    : null,
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || '',
  },
  google: {
    /** Google-Unternehmensprofil (sobald angelegt). Leer = keine Links und keine Bewertungs-Elemente */
    profileUrl: process.env.NEXT_PUBLIC_GOOGLE_PROFILE_URL || '',
    reviewsUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || '',
    reviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '',
  },
  /** Online-Terminbuchung (Calendly, Cal.com o. Ä.). Leer = Anfrage über das eigene Formular. Wird beim Build eingebacken */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
  /** Dauer des kostenlosen Erstgesprächs */
  erstgespraechMin: 15,
} as const

/** Hauptziel aller CTAs: das kostenlose Erstgespräch (Formular auf der Seite, oben ein schmaler Hero-Streifen) */
export const ERSTGESPRAECH = '/erstgespraech/#anfrage'

/**
 * Orte im Umkreis von etwa 20 km um Gummersbach (Vor-Ort-Termine). Fahrtkosten je nach Entfernung.
 * Nur Orte, die wirklich im Umkreis liegen (PRÜFEN: Liste mit Joana abstimmen, muss zum Google-Profil passen).
 */
const W = 'https://de.wikipedia.org/wiki/'
export const ORTE = [
  { name: 'Gummersbach', wiki: W + 'Gummersbach' },
  { name: 'Bergneustadt', wiki: W + 'Bergneustadt' },
  { name: 'Wiehl', wiki: W + 'Wiehl' },
  { name: 'Marienheide', wiki: W + 'Marienheide' },
  { name: 'Engelskirchen', wiki: W + 'Engelskirchen' },
  { name: 'Reichshof', wiki: W + 'Reichshof' },
  { name: 'Nümbrecht', wiki: W + 'N%C3%BCmbrecht' },
  { name: 'Lindlar', wiki: W + 'Lindlar' },
  { name: 'Meinerzhagen', wiki: W + 'Meinerzhagen' },
] as const

export const OBERBERG_WIKI = W + 'Oberbergischer_Kreis'

/** Letzte inhaltliche Überarbeitung (für sitemap lastmod und "Zuletzt aktualisiert"). */
export const CONTENT_UPDATED = '2026-10-16'
