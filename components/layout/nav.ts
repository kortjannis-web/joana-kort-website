export type NavGroup = {
  label: string
  href: string
  children?: { label: string; href: string; hint?: string }[]
  extra?: { title: string; links: { label: string; href: string }[] }
}

/**
 * Header bewusst schlank (4 Punkte): die wichtigsten Wege. Alle weiteren Seiten (Zu zweit, Online-Kurs, Region, Ansatz, FAQ, Ratgeber)
 * sind im Dropdown-Kasten "Mehr", im Footer und an passenden Stellen im Inhalt verlinkt.
 */
export const MAIN_NAV: NavGroup[] = [
  {
    label: 'Angebote',
    href: '/angebote/',
    children: [
      { label: 'Persönliche Begleitung', href: '/stresscoaching/', hint: 'Eins zu eins über 3 oder 6 Monate' },
      { label: 'Online-Webinar', href: '/webinar/', hint: 'Vier Wochen, live per Video' },
      { label: 'Für Unternehmen', href: '/stressmanagement-unternehmen/', hint: 'Schulungen für Teams' },
    ],
    extra: {
      title: 'Mehr',
      links: [
        { label: 'Alle Angebote', href: '/angebote/' },
        { label: 'Zu zweit und in Gruppen', href: '/zu-zweit-und-in-der-gruppe/' },
        { label: 'Online-Kurs', href: '/online-kurs/' },
        { label: 'Mein Ansatz', href: '/mein-ansatz/' },
        { label: 'Vor Ort in Gummersbach', href: '/stressberatung-gummersbach/' },
        { label: 'Online per Video', href: '/stressberatung-online/' },
      ],
    },
  },
  { label: 'Stress verstehen', href: '/stress-verstehen/' },
  { label: 'Über mich', href: '/joana-kort/' },
  { label: 'Kontakt', href: '/erstgespraech/' },
]
