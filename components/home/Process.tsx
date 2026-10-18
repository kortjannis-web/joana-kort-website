'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { Grow } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { ABLAUF } from '@/lib/content/angebote'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { cn } from '@/lib/utils'

const NOTE = 'Kostenlos und unverbindlich, 15 Minuten am Telefon oder per Video'

/** Titel eines Schritts; Schritt 1 (Erstgespräch) als Link, dessen Fläche (after) die ganze Karte abdeckt */
function StepTitle({ i, title, className }: { i: number; title: string; className: string }) {
  if (i !== 0) return <h3 className={className}>{title}</h3>
  return (
    <h3 className={className}>
      <Link
        href={ERSTGESPRAECH}
        className="group/s1 inline-flex items-center gap-1.5 outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-caramel-600"
      >
        {title}
        <ArrowRight className="h-4 w-4 text-caramel-700 transition-transform duration-500 group-hover/s1:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
      </Link>
    </h3>
  )
}

/**
 * So läuft die Begleitung ab (Nummerierung bewusst nur hier).
 * Desktop: fünf Spalten mit Verbindungslinie, alle 3 s hebt sich der nächste Kreis an (.step-dot), Terrakotta füllt die Linie bis dorthin.
 * Handy/Tablet: Schritte als wischbare Karten (Loop).
 */
export function Process({
  title = 'So läuft die Begleitung ab',
  intro = 'Vom ersten Kennenlernen bis zu einem Alltag, der Sie entlastet. Strukturiert, persönlich und in Ihrem Tempo.',
  cta = true,
  steps = ABLAUF,
  tone = 'stone',
}: {
  title?: string
  intro?: string
  cta?: boolean
  steps?: { title: string; text: string }[]
  tone?: 'stone' | 'paper'
}) {
  const { ref, active, bind } = useSpotlight<HTMLOListElement>(steps.length)
  const button = (full = false) =>
    cta && (
      <ButtonLink href={ERSTGESPRAECH} variant="primary" className={full ? 'group w-full' : 'group shrink-0'}>
        {CTA_LABEL}
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
      </ButtonLink>
    )

  return (
    <section aria-labelledby="ablauf-title" className={cn(tone === 'stone' ? 'bg-stone' : 'bg-paper', 'sec xl:flex xl:min-h-svh xl:items-center')}>
      {/* Handy/Tablet */}
      <div className="wrap flex flex-col gap-[var(--sec-gap)] xl:hidden">
        <div>
          <p className="t-label text-caramel-700">Der Ablauf</p>
          <h2 id="ablauf-title" className="t-h2 mt-3 max-w-[18ch] text-espresso-900">
            {title}
          </h2>
          <p className="mt-[clamp(0.5rem,1.5svh,0.75rem)] max-w-[36rem] text-[0.9375rem] leading-relaxed text-muted md:text-base">{intro}</p>
        </div>
        <Carousel label="Schritte" arrowLabel="Schritte" autoplay={3200} item="84vw" itemMd="calc((100% - 1.25rem) / 2)">
          {steps.map((s, i) => (
            <div key={s.title} className="group floaty relative flex h-full flex-col rounded-lg border border-line bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-[#ddd3c6] bg-white font-serif text-[1.3rem] text-caramel-700 transition-colors duration-500 group-data-[active=true]:border-caramel-600 group-data-[active=true]:bg-caramel-600 group-data-[active=true]:text-white">
                  {i + 1}
                </span>
                <span className="text-[0.8125rem] text-muted">
                  Schritt {i + 1} von {steps.length}
                </span>
              </div>
              <StepTitle i={i} title={s.title} className="mt-4 text-[1.125rem] font-semibold leading-snug text-espresso-900" />
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </Carousel>
        {button(true)}
        {cta && <p className="-mt-2 text-center text-[0.8125rem] text-muted">{NOTE}</p>}
      </div>

      {/* Desktop */}
      <div className="wrap hidden xl:block">
        <div className="flex items-end justify-between gap-10">
          <Reveal>
            <p className="t-label text-caramel-700">Der Ablauf</p>
            <h2 className="t-h2 mt-4 max-w-[18ch] text-espresso-900">{title}</h2>
            <p className="mt-4 max-w-[38rem] text-[1.0625rem] leading-relaxed text-muted">{intro}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.1} className="flex flex-col items-end gap-2">
              {button()}
              <p className="text-[0.8125rem] text-muted">{NOTE}</p>
            </Reveal>
          )}
        </div>

        <ol ref={ref} className="relative mt-[calc(var(--sec-gap)*1.5)] grid gap-8" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {/* Verbindungslinie von Kreis 1 bis zum letzten Kreis: zeichnet sich einmal, Terrakotta füllt bis zum aktiven Schritt */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-6 h-0.5 -translate-y-1/2"
            style={{ right: `calc((100% - ${(steps.length - 1) * 2}rem) / ${steps.length} - 1.5rem)` }}
          >
            <Grow className="h-full rounded-full bg-espresso-800/12">
              <span
                className="block h-full origin-left rounded-full bg-caramel-500 transition-transform duration-[900ms] ease-[var(--ease-lift)]"
                style={{ transform: `scaleX(${steps.length > 1 ? active / (steps.length - 1) : 0})` }}
              />
            </Grow>
          </div>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.07} className="relative">
              <div {...bind(i)} className={i === 0 ? 'group relative' : 'group cursor-default'}>
                <span
                  className={`step-dot relative z-10 grid h-12 w-12 place-items-center rounded-md border border-[#ddd3c6] bg-white font-serif text-[1.45rem] leading-none text-caramel-700${i === 0 ? ' pointer-events-none' : ''}`}
                >
                  {i + 1}
                </span>
                <div className="mt-6 transition-opacity duration-700 ease-[var(--ease-soft)] group-data-[active=false]:opacity-75">
                  <StepTitle i={i} title={s.title} className="text-[1.125rem] font-semibold leading-snug text-espresso-900" />
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
