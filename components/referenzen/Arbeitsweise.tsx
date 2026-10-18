import { Compass, MessagesSquare, Route } from 'lucide-react'
import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Arbeitsweise und Stärken (Briefing: zukunftsorientiert, strategisch, empathisch, lösungsorientiert, Freude am Austausch,
 * auf praktische Verbesserung ausgerichtet). Als Dreiergruppe zu je zwei Eigenschaften zusammengefasst.
 * Eigene Fassung statt components/ueber-mich/Staerken.tsx, weil dort nur drei der sechs Stärken vorkommen.
 * Handy wischbar (Carousel), ab Tablet drei Spalten.
 */
const STAERKEN = [
  {
    title: 'Empathisch und im Austausch',
    tags: ['Empathisch', 'Freude am Austausch'],
    text: 'Ich kann mich gut in Menschen hineinversetzen, höre zu und nehme Sie ernst. Gespräche auf Augenhöhe machen mir Freude.',
    Icon: MessagesSquare,
  },
  {
    title: 'Strategisch und lösungsorientiert',
    tags: ['Strategisch', 'Lösungsorientiert'],
    text: 'Statt allgemeiner Ratschläge entwickle ich mit Ihnen konkrete Pläne. Ich frage nicht nur, was schwer ist, sondern was helfen kann.',
    Icon: Route,
  },
  {
    title: 'Zukunftsorientiert und praktisch',
    tags: ['Zukunftsorientiert', 'Praktische Verbesserung'],
    text: 'Ich schaue mit Ihnen nach vorn: Was soll in drei Monaten anders sein? Mein Ziel ist eine spürbare Verbesserung in Ihrem Alltag.',
    Icon: Compass,
  },
]

export function Arbeitsweise() {
  return (
    <section aria-labelledby="arbeitsweise" className="sec bg-greige">
      <div className="wrap">
        <Reveal className="max-w-[44rem]">
          <p className="t-label text-caramel-700">Arbeitsweise und Stärken</p>
          <h2 id="arbeitsweise" className="t-h2 mt-3 text-espresso-900">
            Was ich in die <span className="text-caramel-600">Zusammenarbeit</span> mitbringe
          </h2>
          <p className="mt-[clamp(0.5rem,2svh,0.875rem)] text-[0.9375rem] leading-relaxed text-muted compact:hidden md:text-[1.0625rem]">
            Fachwissen ist das eine. Ebenso wichtig ist, wie wir zusammenarbeiten: persönlich, klar und mit dem Blick auf das, was Sie im Alltag
            weiterbringt.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
          <Carousel label="Stärken" arrowLabel="Stärken" item="82vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
            {STAERKEN.map(({ title, tags, text, Icon }) => (
              <article key={title} className="lift-hover floaty flex h-full flex-col rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                <span className="lift-tile grid h-11 w-11 place-items-center rounded-md bg-espresso-800 text-caramel-200">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-[clamp(0.75rem,2svh,1.25rem)] text-[1.125rem] font-semibold leading-snug text-espresso-900 md:text-[1.1875rem]">{title}</h3>
                <p className="mt-1.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
                <ul className="mt-[clamp(0.75rem,2svh,1rem)] flex flex-wrap gap-2" aria-label="Stärken">
                  {tags.map((t) => (
                    <li key={t} className="rounded-sm border border-line bg-stone px-2.5 py-1 text-[0.8125rem] text-espresso-800">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
