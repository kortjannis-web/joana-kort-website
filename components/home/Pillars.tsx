'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { InView } from '@/components/ui/InView'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { SCHWERPUNKTE } from '@/lib/content/angebote'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Versatz je Schwerpunkt ab Tablet (Briefing: "leicht nach rechts versetzt"), Verbindung als Treppe dazwischen */
const OFFSET = ['0%', '12%', '24%']

/**
 * Die drei Schwerpunkte als wiedererkennbares Konzept: drei Karten, jeweils leicht nach rechts versetzt, verbunden durch eine
 * gestrichelte Treppe (zeichnet sich beim Hinscrollen). Große kursive Ziffer, Titel, Erklärung, typische Fragen.
 * Im Loop (4,5 s) hebt sich der aktive Schwerpunkt an (.loop-card), Hover hält fest.
 * `sheet`: als Fläche mit runden Ecken, die sich über die stehende Espresso-Section davor schiebt (Startseite).
 */
export function Pillars({ sheet = false, title, intro, cta = true }: { sheet?: boolean; title?: React.ReactNode; intro?: string; cta?: boolean }) {
  const { ref, bind } = useSpotlight<HTMLOListElement>(SCHWERPUNKTE.length, 4500)
  return (
    <section
      aria-labelledby="schwerpunkte-title"
      className={cn(sheet && 'sheet', 'paper-grain bg-paper pb-20 pt-14 md:pb-28 md:pt-20 xl:pb-32 xl:pt-24')}
    >
      <div className="wrap">
        <Reveal className="max-w-[46rem]">
          <p className="t-label text-caramel-700">Mein Ansatz</p>
          <h2 id="schwerpunkte-title" className="t-h2 mt-3 text-espresso-900">
            {title ?? (
              <>
                Drei Schwerpunkte, die <em className="italic text-caramel-600">aufeinander aufbauen</em>
              </>
            )}
          </h2>
          <p className="t-lead mt-5 text-muted">
            {intro ??
              'Erst verstehen, dann bewältigen, dann den Alltag neu gestalten. So wird aus Wissen Schritt für Schritt Veränderung, die bleibt.'}
          </p>
        </Reveal>

        <InView className="pillar-line mt-10 md:mt-14" threshold={0.2}>
          <ol ref={ref}>
            {SCHWERPUNKTE.map((p, i) => (
              <li key={p.nr} {...bind(i)} className="lift-hover">
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="pillar-step hidden h-12 rounded-bl-[2rem] border-b-[1.5px] border-l-[1.5px] border-dashed border-caramel-400 md:block"
                    style={{ marginLeft: `calc(${OFFSET[i - 1]} + 3.6rem)`, width: '12%', '--d': `${0.5 + i * 0.5}s` } as React.CSSProperties}
                  />
                )}
                <article
                  className={cn('loop-card relative rounded-xl border border-line bg-white p-6 md:ml-[var(--off)] md:w-[76%] md:p-8 xl:p-10', i > 0 && 'mt-4 md:mt-0')}
                  style={{ '--off': OFFSET[i] } as React.CSSProperties}
                >
                  <div className="grid gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-7 xl:grid-cols-[4rem_minmax(0,1fr)] xl:gap-9">
                    <span
                      aria-hidden="true"
                      className="pillar-num font-serif text-[4rem] italic leading-[0.8] text-caramel-600 md:text-[5rem] xl:text-[5.75rem]"
                      style={{ '--d': `${0.3 + i * 0.5}s` } as React.CSSProperties}
                    >
                      {p.nr}
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.75rem] leading-[1.12] tracking-[-0.012em] text-espresso-900 md:text-[2.125rem]">
                        <span className="sr-only">{p.nr}. </span>
                        {p.title}
                      </h3>
                      <p className="mt-2 font-serif text-[1.0625rem] italic leading-snug text-caramel-700 md:text-[1.1875rem]">{p.kurz}</p>
                      {/* Langtext und typische Fragen erst nach Klick auf den Pfeil (im HTML vorhanden, für Suche und KI lesbar) */}
                      <More label={`Mehr zu: ${p.title}`} className="relative z-10 mt-3">
                        <p className="leading-relaxed text-ink/85">{p.text}</p>
                        <ul className="mt-5 grid gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.9375rem] text-muted sm:grid-cols-2">
                          {p.fragen.map((f) => (
                            <li key={f} className="flex gap-2.5 leading-snug">
                              <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-caramel-500" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </More>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </InView>

        {cta && (
          <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7 md:mt-14 md:pl-[24%]">
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="group w-full sm:w-auto">
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
            </ButtonLink>
            <Link href="/mein-ansatz/" className="link inline-flex min-h-11 items-center justify-center font-semibold sm:justify-start">
              Mehr über meinen Ansatz
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
