import { CtaRow } from '@/components/ui/CtaRow'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollLine } from '@/components/ui/ScrollLine'
import { SorgenList } from './SorgenList'
import { GapScene } from './GapScene'

/**
 * Stufe 2: Der Schmerz. Fragen, in denen sich Besucher wiedererkennen (Briefing), dann der Kern: die Lücke zwischen Wissen und Umsetzung.
 * Ab Tablet: Überschrift über beiden Spalten, links das Bild der Lücke (GapScene), rechts die Fragen im Loop.
 * Handy: Überschrift, Bild der Lücke, Fragen, CTA. Abstände am Viewport bemessen, passt in einen Bildschirm.
 */
export function Situation() {
  return (
    <section aria-labelledby="situation-title" className="sec relative isolate xl:flex xl:min-h-[calc(100svh-5rem)] xl:items-center">
      <ScrollLine variant="a" />
      <div className="wrap grid gap-[var(--sec-gap)] md:grid-cols-2 md:gap-x-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] xl:gap-x-16">
        <Reveal className="md:col-span-2">
          <p className="t-label text-caramel-700">Kennen Sie das?</p>
          <h2 id="situation-title" className="t-h2 mt-3 max-w-[24ch] text-espresso-900 xl:max-w-[30ch]">
            Sie wissen, dass Sie Stress haben. Nur nicht, wie Sie <em className="italic text-caramel-600">etwas verändern</em> können.
          </h2>
        </Reveal>

        <div className="max-md:order-2 md:col-start-2 md:row-start-2 md:self-center">
          <SorgenList />
          <Reveal delay={0.2}>
            <p className="mt-[clamp(1rem,2.5svh,1.75rem)] max-w-[34rem] font-serif text-[1.0625rem] leading-snug md:text-[clamp(1.125rem,0.8rem+1.2svh,1.45rem)] text-espresso-900">
              Das ist kein Versagen. Meist fehlt nicht das Wissen, sondern der Weg vom Wissen ins Tun. Genau dort setze ich an.
            </p>
            {/* Handy: CTA folgt bei den Schwerpunkten, damit die Section in einen Bildschirm passt */}
            <CtaRow className="mt-[clamp(1rem,2.5svh,1.75rem)] max-md:hidden" />
          </Reveal>
        </div>

        <Reveal className="md:col-start-1 md:row-start-2 md:self-center max-md:order-1">
          <GapScene />
        </Reveal>
      </div>
    </section>
  )
}
