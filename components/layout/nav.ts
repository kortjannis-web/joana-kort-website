import { ANGEBOTE } from '@/lib/content/angebote'

export type NavGroup = {
  label: string
  href: string
  children?: { label: string; href: string; hint?: string }[]
  extra?: { title: string; links: { label: string; href: string }[] }
}

export const MAIN_NAV: NavGroup[] = [
  {
    label: 'Angebote',
    href: '/angebote/',
    children: ANGEBOTE.map((a) => ({ label: a.short, href: a.path, hint: a.hint })),
    extra: {
      title: 'Online und vor Ort',
      links: [
        { label: 'Alle Angebote', href: '/angebote/' },
        { label: 'Kostenloses Erstgespräch', href: '/erstgespraech/' },
        { label: 'Stressberatung Gummersbach', href: '/stressberatung-gummersbach/' },
        { label: 'Stressberatung online', href: '/stressberatung-online/' },
      ],
    },
  },
  { label: 'Mein Ansatz', href: '/mein-ansatz/' },
  { label: 'Über mich', href: '/joana-kort/' },
  { label: 'Ratgeber', href: '/ratgeber/' },
  { label: 'Kontakt', href: '/erstgespraech/' },
]
