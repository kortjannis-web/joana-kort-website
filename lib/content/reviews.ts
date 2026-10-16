/**
 * Google-Bewertungen bzw. Kundenstimmen. NUR echte Stimmen eintragen, deren Veröffentlichung erlaubt ist (Briefing).
 * Solange die Liste leer ist, blenden sich die Bewertungs-Section und das Sternchen-Badge im Hero automatisch aus.
 * Neue Bewertung: Eintrag ergänzen (Originaltext, Kürzungen mit […]), Datum als YYYY-MM-DD. Sortierung: neueste zuerst.
 * GOOGLE_RATING: Durchschnitt und Anzahl laut Google-Profil (Stand im Kommentar pflegen).
 */
export type Review = { name: string; initials: string; context: string; date: string; text: string; source: 'Google' | 'Direkt' }

const LISTE: Review[] = [
  // Beispiel (nicht aktiv):
  // { name: 'Vorname N.', initials: 'VN', context: 'Persönliche Begleitung', date: '2027-03-01', text: '…', source: 'Google' },
]

export const REVIEWS: Review[] = [...LISTE].sort((a, b) => b.date.localeCompare(a.date))

/** Stand: noch kein Google-Profil (16.10.2026). count 0 = Badge ausgeblendet */
export const GOOGLE_RATING = { rating: 0, count: 0 }

export const fmtReviewDate = (d: string) => new Date(d).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
