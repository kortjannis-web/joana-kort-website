import Link from 'next/link'

import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'
import { ANGEBOTE, type AngebotKey } from '@/lib/content/angebote'

/** Querverlinkung: die übrigen Angebote als kompakte Karten (Ende jeder Angebotsseite, Ratgeber). Handy wischbar, ab Tablet Raster */
export function MoreOffers({ current, title = 'Weitere Angebote' }: { current?: AngebotKey; title?: string }) {
  const list = ANGEBOTE.filter((a) => a.key !== current)
  return (
    <section aria-labelledby="mehr-angebote" className="bg-stone sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
      <div className="wrap">
        <Reveal className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-3">
          <h2 id="mehr-angebote" className="t-h2 text-espresso-900">
            {title}
          </h2>
          <Link href="/angebote/" className="link inline-flex min-h-11 items-center self-start font-semibold md:self-auto">
            Alle Angebote im Überblick
          </Link>
        </Reveal>
        <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
          <Carousel label={title} arrowLabel="Angebote" item="74vw" gridFrom="md" gridClass="md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:gap-6">
            {list.map((a) => (
              <div key={a.key} className="frame-soft floaty group relative flex h-full flex-col rounded-lg bg-white p-5 xl:p-6">
                <p className="text-[0.8125rem] font-semibold text-caramel-700">{a.hint}</p>
                <h3 className="mt-2 font-serif text-[1.3rem] leading-tight text-espresso-900">{a.title}</h3>
                <Link
                  href={a.path}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start pt-4 font-semibold text-espresso-800 transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit] hover:text-caramel-800"
                >
                  Ansehen
                </Link>
              </div>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
