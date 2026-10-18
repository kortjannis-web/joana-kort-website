import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { ERSTGESPRAECH } from '@/lib/site'

const WEGE = [
  { href: '/stresscoaching/', label: 'Stresscoaching: persönliche Begleitung' },
  { href: '/angebote/', label: 'Alle Angebote' },
  { href: '/mein-ansatz/', label: 'Mein Ansatz' },
  { href: '/ratgeber/', label: 'Ratgeber' },
  { href: '/erstgespraech/', label: 'Kostenloses Erstgespräch' },
]

/** 404 im Stil der Rechtstexte: kein Hero, heller Header */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="pb-[4.5rem] pt-28 md:pb-28 md:pt-36 xl:pb-32 xl:pt-40">
      <div className="wrap">
        <div className="max-w-[47.5rem]">
          <p className="t-label text-bordeaux">Seite nicht gefunden</p>
          <h1 id="nf-title" className="t-h1 mt-5 text-espresso-900 md:mt-7">
            Diese Seite gibt es leider nicht. <em className="italic text-caramel-600">Kein Stress.</em>
          </h1>
          <p className="t-lead mt-5 text-muted md:mt-6">Hier geht es weiter:</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="/" variant="primary" size="lg" className="w-full sm:w-auto">
              Zur Startseite
            </ButtonLink>
            <ButtonLink href={ERSTGESPRAECH} variant="outline" size="lg" className="w-full sm:w-auto">
              Erstgespräch anfragen
            </ButtonLink>
          </div>
          <nav aria-label="Weitere Seiten" className="mt-12 md:mt-16">
            <ul className="border-t border-line">
              {WEGE.map((w) => (
                <li key={w.href}>
                  <Link
                    href={w.href}
                    className="group flex min-h-14 items-center justify-between gap-3 border-b border-line text-base font-semibold text-ink transition-colors duration-500 ease-[var(--ease-soft)] hover:text-bordeaux"
                  >
                    {w.label}
                    <ChevronRight className="h-[1.125rem] w-[1.125rem] shrink-0 text-caramel-600 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
