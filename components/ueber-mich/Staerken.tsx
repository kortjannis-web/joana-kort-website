'use client'

import { Compass, HeartHandshake, Route } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'

/** Joanas Stärken (Briefing), als Dreiergruppe zusammengefasst. Im Loop hebt sich je eine an (lift-tile auf Espresso-Kachel) */
const STAERKEN = [
  { title: 'Einfühlsam und verbunden', text: 'Ich kann mich gut in Menschen hineinversetzen, begegne Ihnen auf Augenhöhe und nehme Sie ernst.', Icon: HeartHandshake },
  { title: 'Strategisch und optimierend', text: 'Ich entwickle mit Ihnen konkrete Pläne statt allgemeiner Ratschläge und mache Dinge gern einfacher.', Icon: Route },
  { title: 'Zukunftsorientiert', text: 'Ich schaue mit Ihnen nach vorn: Was soll in drei Monaten anders sein, und was braucht es dafür?', Icon: Compass },
]

export function Staerken() {
  const { ref, bind } = useSpotlight<HTMLUListElement>(STAERKEN.length, 2600)
  return (
    <section aria-labelledby="staerken" className="bg-greige py-16 md:py-24 xl:py-28">
      <div className="wrap">
        <Reveal>
          <h2 id="staerken" className="t-h2 max-w-[24ch] text-espresso-900">
            Was ich in die Zusammenarbeit mitbringe
          </h2>
          <p className="mt-3.5 max-w-[40rem] leading-relaxed text-muted md:text-[1.125rem]">
            Menschen verstehen und gemeinsam konkrete Lösungen finden: Das verbinde ich mit Freude.
          </p>
        </Reveal>
        <ul ref={ref} className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4 xl:gap-6">
          {STAERKEN.map(({ title, text, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 0.05}>
              <div {...bind(i)} className="lift-hover floaty flex h-full flex-col gap-3 rounded-lg border border-line bg-white p-5 md:p-6">
                <span className="lift-tile grid h-11 w-11 place-items-center rounded-md bg-espresso-800 text-caramel-200">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <p className="font-serif text-[1.25rem] text-espresso-900">{title}</p>
                <p className="text-[0.9375rem] leading-snug text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
