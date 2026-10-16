/**
 * Bilder der Website.
 * Materialien: Seiten aus Joanas eigenen Vorlagen (Stresstagebuch, Tagesplaner, Wochenfokus), aus den PDFs gerendert.
 * Fotos von Joana: noch nicht vorhanden. Sobald es professionelle Fotos gibt, hier eintragen (PORTRAIT, ARBEIT),
 * die Website zeigt sie dann automatisch (Über-mich-Teaser auf der Startseite, Über-mich-Seite, Ratgeber-Autorin).
 */

export type Img = { src: string; srcSet?: string; alt: string; w: number; h: number }

const m = (name: string, big: number, small: number, w: number, h: number, alt: string): Img => ({
  src: `/images/material/${name}-${big}.webp`,
  srcSet: `/images/material/${name}-${small}.webp ${small}w, /images/material/${name}-${big}.webp ${big}w`,
  alt,
  w,
  h,
})

export const MATERIAL = {
  tagebuchTitel: m('stresstagebuch-titel', 1400, 800, 1400, 990, 'Titelseite des Stresstagebuchs von Joana Kort: Mein Stresstagebuch, vier Wochen lang'),
  tagebuchAnleitung: m(
    'stresstagebuch-anleitung',
    1400,
    800,
    1400,
    990,
    'Anleitung im Stresstagebuch: Situation festhalten, Auslöser und Stresslevel von 0 bis 10, Reaktion und Lösung, mit Beispiel'
  ),
  tagebuchWoche: m('stresstagebuch-woche', 1400, 800, 1400, 990, 'Wochenblatt im Stresstagebuch mit Spalten für Situation, Auslöser, Stresslevel, Reaktion und Lösung sowie Wochenrückblick'),
  tagebuchRueckblick: m(
    'stresstagebuch-rueckblick',
    1400,
    800,
    1400,
    990,
    'Rückblick nach vier Wochen im Stresstagebuch: häufigste Auslöser, Stress-Hochzeiten, wirksamste Lösungen und nächste Schritte'
  ),
  tagesplaner: m('tagesplaner', 800, 500, 800, 1127, 'Tagesplaner von Joana Kort mit Stundenplan, Stresslevel, Gewohnheiten, To-dos und Dankbarkeit'),
  wochenfokus: m('wochenfokus', 900, 560, 900, 1058, 'Wochenfokus von Joana Kort mit Wochenziel und Tageszeilen von Montag bis Sonntag'),
} as const

/** Foto von Joana (Porträt). null = Platzhalter mit Materialien statt Foto. PRÜFEN: Fotos nachliefern */
export const PORTRAIT: Img | null = null

/**
 * Vorstellungsvideo von Joana (Startseite direkt unter dem Hero). null = gestalteter Platzhalter.
 * PRÜFEN: Video als MP4 (H.264, ca. 1 bis 2 Minuten, 1080p) nach public/video/ legen, Vorschaubild dazu, Untertitel (VTT) empfohlen.
 * Selbst gehostet: kein YouTube, keine Einwilligung nötig.
 */
export const VIDEO: { src: string; poster: string; captions?: string; duration?: string; uploadDate: string } | null = null

/** Open-Graph-Bild (1200 × 630), siehe public/og */
export const OG_IMAGE = {
  url: '/og/og-joana-kort-stressberatung.jpg',
  width: 1200,
  height: 630,
  alt: 'Joana Kort Stressberatung: Stress verstehen. Stress bewältigen. Stress managen.',
}
