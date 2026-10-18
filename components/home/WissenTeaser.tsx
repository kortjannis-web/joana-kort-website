import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Carousel } from '@/components/ui/Carousel'
import { InView } from '@/components/ui/InView'
import { Reveal } from '@/components/ui/Reveal'
import { ExplainScene } from '@/components/wissen/ExplainScene'
import { WISSEN_TEASER } from '@/lib/content/wissen'

/**
 * Startseite: drei Erklärungen aus "Stress verstehen" (3er-Gruppe), jede mit eigener kleinen Animation.
 * Kurzantwort sichtbar, die ausführliche Erklärung liegt auf /stress-verstehen/ (Anker je Thema).
 */
export function WissenTeaser() {
  return (
    <section aria-labelledby="wissen-title" className="sec xl:flex xl:min-h-svh xl:flex-col xl:justify-center">
      <div className="wrap">
        <Reveal className="flex items-end justify-between gap-6 md:gap-10">
          <div className="max-w-[40rem]">
            <p className="t-label text-bordeaux">Stress verstehen</p>
            <h2 id="wissen-title" className="t-h2 mt-3 text-espresso-900">
              Was bei Stress <em className="italic text-caramel-600">in Ihnen</em> passiert
            </h2>
          </div>
          <Link href="/stress-verstehen/" aria-label="Alle Erklärungen" className="link inline-flex min-h-11 shrink-0 items-center text-[0.9375rem] font-semibold">
            <span className="md:hidden">Alle</span>
            <span className="hidden md:inline">Alle Erklärungen</span>
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
          <Carousel label="Erklärungen zu Stress" arrowLabel="Erklärungen" item="84vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
            {WISSEN_TEASER.map((t) => (
              <article key={t.id} className="frame-soft floaty group relative flex h-full flex-col overflow-hidden rounded-xl bg-white">
                <InView className="explain bg-stone px-4 pb-1 pt-[clamp(0.5rem,2svh,1.25rem)] [&_svg]:mx-auto [&_svg]:max-h-[clamp(7rem,20svh,12rem)]" threshold={0.5}>
                  <ExplainScene scene={t.scene} labels={t.stichworte} title={t.frage} />
                </InView>
                <div className="flex flex-1 flex-col p-5 md:p-[clamp(1.25rem,2.8svh,1.75rem)]">
                  <h3 className="font-serif text-[clamp(1.25rem,0.95rem+1svh,1.375rem)] leading-tight text-espresso-900">{t.frage}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{t.kurz}</p>
                  <Link
                    href={`/stress-verstehen/#${t.id}`}
                    className="mt-[clamp(0.5rem,1.5svh,1.25rem)] inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-espresso-800 underline decoration-bordeaux/45 underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit] hover:text-bordeaux"
                  >
                    Ausführlich erklärt
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
