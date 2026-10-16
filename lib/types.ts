/**
 * Inhaltstypen. Texte in Feldern vom Typ `Rich` dürfen einfache Auszeichnung enthalten:
 *   **fett**  und  [Linktext](/interner-pfad/)  bzw. [Linktext](https://extern.de)
 * Sonst reiner Text, kein HTML.
 */
export type Rich = string

export type Faq = { q: string; a: Rich }

export type Block =
  | { type: 'p'; text: Rich }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: Rich[] }
  | { type: 'ol'; items: Rich[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][]; source?: Rich }
  | { type: 'callout'; title: string; text: Rich }
  | { type: 'image'; src: string; alt: string; w: number; h: number; caption?: string }

export type Artikel = {
  slug: string
  /** H1 */
  title: string
  metaTitle: string // max. 60 Zeichen
  metaDescription: string // max. 155 Zeichen
  /** Teaser für die Übersicht, 1 bis 2 Sätze */
  excerpt: string
  /** Direkte Antwort in zwei Sätzen unter der H1 (GEO) */
  answer: Rich
  category: 'Stress verstehen' | 'Stress bewältigen' | 'Stress managen' | 'Wissen'
  published: string // YYYY-MM-DD
  updated: string // YYYY-MM-DD
  readingMinutes: number
  /** Zielseite am Artikelende */
  cta: { title: string; text: string; label: string; href: string }
  blocks: Block[]
  faqs: Faq[]
  sources: { label: string; url?: string }[]
}
