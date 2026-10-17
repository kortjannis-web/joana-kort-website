'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { InView } from '@/components/ui/InView'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { SCHWERPUNKTE } from '@/lib/content/angebote'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Stufe je Schwerpunkt ab Tablet: jede Karte sitzt eine Stufe höher als die vorige (sie bauen aufeinander auf) */
const STEP = 'clamp(1.25rem, 3.5svh, 2.75rem)'

type Pillar = (typeof SCHWERPUNKTE)[number]

function PillarCard({ p, i }: { p: Pillar; i: number }) {
  return (
    <article className="loop-card relative flex h-full flex-col rounded-xl border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,2.25rem)]">
      <div className="flex items-baseline gap-3 xl:gap-4">
        <span
          aria-hidden="true"
          className="pillar-num font-serif text-[clamp(2.75rem,2rem+3svh,4.5rem)] italic leading-[0.8] text-caramel-600"
          style={{ '--d': `${0.3 + i * 0.5}s` } as React.CSSProperties}
        >
          {p.nr}
        </span>
        <h3 className="font-serif text-[clamp(1.375rem,1rem+1.4svh,2rem)] leading-[1.12] tracking-[-0.012em] text-espresso-900">
          <span className="sr-only">{p.nr}. </span>
          {p.title}
        </h3>
      </div>
      <p className="mt-3 flex-1 font-serif text-[1.0625rem] italic leading-snug text-caramel-700 md:text-[clamp(1rem,0.8rem+0.8svh,1.1875rem)]">{p.kurz}</p>
      {/* Langtext und typische Fragen erst nach Klick auf den Pfeil (im HTML vorhanden, für Suche und KI lesbar) */}
      <More label={`Mehr zu: ${p.title}`} className="relative z-10 mt-2">
        <p className="leading-relaxed text-ink/85">{p.text}</p>
        <ul className="mt-4 grid gap-y-2 border-t border-line pt-4 text-[0.9375rem] text-muted">
          {p.fragen.map((f) => (
            <li key={f} className="flex gap-2.5 leading-snug">
              <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-caramel-500" />
              {f}
            </li>
          ))}
        </ul>
      </More>
    </article>
  )
}

/**
 * Die drei Schwerpunkte als wiedererkennbares Konzept. Ab Tablet drei Karten nebeneinander als aufsteigende Treppe
 * (jede eine Stufe höher), verbunden durch gestrichelte Stufen, die sich beim Hinscrollen zeichnen. Große kursive Ziffer, Titel, Kurzsatz,
 * Langtext und typische Fragen hinter dem Pfeil. Im Loop (4,5 s) hebt sich der aktive Schwerpunkt an (.loop-card), Hover hält fest.
 * Handy: wischbar (Karussell). Die Section passt immer in einen Bildschirm.
 * `sheet`: als Fläche mit runden Ecken, die sich über die stehende Espresso-Section davor schiebt (Startseite).
 */
export function Pillars({ sheet = false, title, intro, cta = true }: { sheet?: boolean; title?: React.ReactNode; intro?: string; cta?: boolean }) {
  const { ref, bind } = useSpotlight<HTMLOListElement>(SCHWERPUNKTE.length, 4500)
  return (
    <section
      aria-labelledby="schwerpunkte-title"
      className={cn(sheet && 'sheet', 'paper-grain sec bg-paper xl:flex xl:min-h-svh xl:flex-col xl:justify-center')}
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
          <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-muted">
            {intro ??
              'Erst verstehen, dann bewältigen, dann den Alltag neu gestalten. So wird aus Wissen Schritt für Schritt Veränderung, die bleibt.'}
          </p>
        </Reveal>

        <InView className="pillar-line mt-[var(--sec-gap)]" threshold={0.2}>
          <div className="md:hidden">
            <Carousel label="Drei Schwerpunkte" arrowLabel="Schwerpunkte" item="84vw">
              {SCHWERPUNKTE.map((p, i) => (
                <PillarCard key={p.nr} p={p} i={i} />
              ))}
            </Carousel>
          </div>
          <ol ref={ref} className="hidden grid-cols-3 gap-5 md:grid xl:gap-8">
            {SCHWERPUNKTE.map((p, i) => (
              <li
                key={p.nr}
                {...bind(i)}
                className="lift-hover relative h-full"
                style={{ paddingTop: `calc(${STEP} * ${SCHWERPUNKTE.length - 1 - i})` }}
              >
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="pillar-step absolute right-full w-5 rounded-tl-[1.25rem] border-l-[1.5px] border-t-[1.5px] border-dashed border-caramel-400 xl:w-8"
                    style={{ top: `calc(${STEP} * ${SCHWERPUNKTE.length - 1 - i} + 2.5rem)`, height: STEP, '--d': `${0.5 + i * 0.5}s` } as React.CSSProperties}
                  />
                )}
                <PillarCard p={p} i={i} />
              </li>
            ))}
          </ol>
        </InView>

        {cta && (
          <Reveal className="mt-[var(--sec-gap)] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
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
