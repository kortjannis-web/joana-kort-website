export type NavGroup = {
  label: string
  href: string
  children?: { label: string; href: string; hint?: string }[]
  extra?: { title: string; links: { label: string; href: string }[] }
}

/**
 * Header mit fünf Punkten (Briefing Ä6, Konzept und Methoden zusammengelegt, Referenzen unter "Über mich").
 * Weitere Seiten (Zu zweit, Online-Kurs, Region, FAQ, Ratgeber) im Kasten "Mehr", im Footer und an passenden Stellen im Inhalt.
 */
export const MAIN_NAV: NavGroup[] = [
  {
    label: 'Konzept',
    href: '/mein-ansatz/',
    children: [
      { label: 'Mein Ansatz', href: '/mein-ansatz/', hint: 'Verstehen, bewältigen, managen' },
      { label: 'Methoden und Werkzeuge', href: '/methoden/', hint: 'Womit wir praktisch arbeiten' },
      { label: 'Stress verstehen', href: '/stress-verstehen/', hint: 'Wie Stress entsteht und wirkt' },
    ],
  },
  {
    label: 'Angebote',
    href: '/angebote/',
    children: [
      { label: 'Persönliche Begleitung', href: '/stresscoaching/', hint: 'Wöchentlich oder alle zwei Wochen' },
      { label: 'Online-Webinar', href: '/webinar/', hint: 'Vier Wochen, live per Video' },
      { label: 'Für Unternehmen', href: '/stressmanagement-unternehmen/', hint: 'Trainings und Workshops für Teams' },
    ],
    extra: {
      title: 'Mehr',
      links: [
        { label: 'Alle Angebote', href: '/angebote/' },
        { label: 'Zu zweit und in Gruppen', href: '/zu-zweit-und-in-der-gruppe/' },
        { label: 'Online-Kurs (in Vorbereitung)', href: '/online-kurs/' },
        { label: 'Vor Ort in Gummersbach', href: '/stressberatung-gummersbach/' },
        { label: 'Online per Video', href: '/stressberatung-online/' },
        { label: 'Häufige Fragen', href: '/haeufige-fragen/' },
      ],
    },
  },
  { label: 'Ablauf', href: '/ablauf/' },
  {
    label: 'Über mich',
    href: '/joana-kort/',
    children: [
      { label: 'Über mich', href: '/joana-kort/', hint: 'Motivation und Arbeitsweise' },
      { label: 'Qualifikationen und Referenzen', href: '/qualifikationen-und-referenzen/', hint: 'Studium, Fortbildungen, Trainings' },
    ],
  },
  { label: 'Kontakt', href: '/erstgespraech/' },
]
