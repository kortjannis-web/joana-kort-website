import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

/**
 * Rechtstexte (Design "Impressum"): kein Bild-Hero, heller Header, Brotkrumen, großer Titel, Lesespalte (max. 760px).
 * `lead`: optionaler Block zwischen Titel und Text (Impressum: Karte mit Anschrift und Kontakt).
 * Kein Reveal im sichtbaren Bereich (Text soll sofort lesbar sein).
 */
export function LegalPage({
  title,
  path,
  children,
  lead,
  after,
}: {
  title: string
  path: string
  children: ReactNode
  lead?: ReactNode
  after?: ReactNode
}) {
  return (
    <section aria-labelledby="legal-title" className="pb-24 pt-28 md:pb-32 md:pt-36 xl:pb-40 xl:pt-40">
      <div className="wrap">
        <Breadcrumbs items={[{ name: title, path }]} />
        <div className="max-w-[47.5rem]">
          <h1 id="legal-title" lang="de" className="t-h1 mt-5 text-espresso-900 md:mt-7">
            {title}
          </h1>
          {lead && <div className="mt-5 md:mt-8">{lead}</div>}
          <div className="prose-jk mt-8 md:mt-10 [&>h2:first-child]:mt-0">{children}</div>
          {after}
        </div>
      </div>
    </section>
  )
}
