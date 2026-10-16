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
    <section aria-labelledby="wissen-title" className="py-16 md:py-24 xl:py-28">
      <div className="wrap">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[40rem]">
            <p className="t-label text-caramel-700">Stress verstehen</p>
            <h2 id="wissen-title" className="t-h2 mt-3 text-espresso-900">
              Was bei Stress <em className="italic text-caramel-600">in Ihnen</em> passiert
            </h2>
          </div>
          <Link href="/stress-verstehen/" className="link hidden shrink-0 font-semibold md:inline-flex">
            Alle Erklärungen
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 md:mt-10">
          <Carousel label="Erklärungen zu Stress" arrowLabel="Erklärungen" item="84vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
            {WISSEN_TEASER.map((t) => (
              <article key={t.id} className="frame-soft floaty group relative flex h-full flex-col overflow-hidden rounded-xl bg-white">
                <InView className="explain bg-stone px-4 pb-2 pt-5" threshold={0.5}>
                  <ExplainScene scene={t.scene} labels={t.stichworte} title={t.frage} />
                </InView>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-serif text-[1.375rem] leading-tight text-espresso-900">{t.frage}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{t.kurz}</p>
                  <Link
                    href={`/stress-verstehen/#${t.id}`}
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-espresso-800 underline decoration-caramel-400/70 underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit] hover:text-caramel-800"
                  >
                    Ausführlich erklärt
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </Carousel>
        </Reveal>
        <Link href="/stress-verstehen/" className="link mt-6 flex justify-center font-semibold md:hidden">
          Alle Erklärungen
        </Link>
      </div>
    </section>
  )
}
