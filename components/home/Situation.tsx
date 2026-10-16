import { ArrowRight } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SorgenList } from './SorgenList'
import { FunnelCta } from './HeroMotion'
import { GapScene } from './GapScene'

/**
 * Stufe 2: Der Schmerz. Fragen, in denen sich Besucher wiedererkennen (Briefing), dann der Kern: die Lücke zwischen Wissen und Umsetzung.
 * Desktop: Überschrift über beiden Spalten, links das Bild der Lücke (GapScene), rechts die Fragen im Loop.
 */
export function Situation() {
  return (
    <section aria-labelledby="situation-title" className="py-16 md:py-24 xl:flex xl:min-h-[calc(100svh-5rem)] xl:items-center xl:py-[8svh]">
      <div className="wrap grid gap-8 md:gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-x-16 xl:gap-y-10">
        <Reveal className="xl:col-span-2">
          <p className="t-label text-caramel-700">Kennen Sie das?</p>
          <h2 id="situation-title" className="t-h2 mt-3 max-w-[24ch] text-espresso-900 xl:max-w-[30ch]">
            Sie wissen, dass Sie Stress haben. Nur nicht, wie Sie <em className="italic text-caramel-600">etwas verändern</em> können.
          </h2>
        </Reveal>

        <div className="-mt-2 md:-mt-6 xl:col-start-2 xl:row-start-2 xl:mt-0 xl:self-center">
          <SorgenList />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[34rem] font-serif text-[1.3rem] leading-snug text-espresso-900 md:text-[1.45rem]">
              Das ist kein Versagen. Meist fehlt nicht das Wissen, sondern der Weg vom Wissen ins Tun. Genau dort setze ich an.
            </p>
          </Reveal>
        </div>

        <Reveal className="xl:col-start-1 xl:row-start-2 xl:self-center">
          <GapScene />
          <FunnelCta className={buttonClass('primary', 'lg', 'group mt-8 w-full md:hidden')}>
            Kostenloses Erstgespräch
            <ArrowRight className="h-[1.125rem] w-[1.125rem] shrink-0 transition-transform duration-500 ease-[var(--ease-lift)] group-hover:translate-x-1.5" strokeWidth={2} aria-hidden="true" />
          </FunnelCta>
        </Reveal>
      </div>
    </section>
  )
}
