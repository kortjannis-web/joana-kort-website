import Link from 'next/link'

import { ButtonLink } from '@/components/ui/Button'
import { InView } from '@/components/ui/InView'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { StepIcon } from '@/components/ui/StepIcons'
import { SCHWERPUNKTE } from '@/lib/content/angebote'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Einrückung je Schritt (Briefing Ä6: jede Zeile weiter nach rechts). Handy klein, ab Tablet deutlich */
const INDENT = ['ml-0', 'ml-4 md:ml-[12%]', 'ml-8 md:ml-[24%]']

/**
 * Die drei Schritte als zentrales Konzept (Briefing Ä6): drei versetzte Zeilen, jede eine Stufe weiter rechts eingerückt.
 * Je Zeile: eigenes Linien-Icon, Nummer, Überschrift und erklärender Satz nebeneinander (ab Tablet), Langtext hinter dem Pfeil.
 * Eine feine Linie verbindet die Zeilen zu einem Prozess (zeichnet sich beim Hinscrollen). Auch ohne Icons verständlich.
 * `sheet`: Fläche, die sich über die stehende Espresso-Section davor schiebt (Startseite).
 */
export function Pillars({ sheet = false, title, intro, cta = true }: { sheet?: boolean; title?: React.ReactNode; intro?: string; cta?: boolean }) {
  return (
    <section
      aria-labelledby="schwerpunkte-title"
      className={cn(sheet && 'sheet', 'paper-grain sec bg-paper xl:flex xl:min-h-svh xl:flex-col xl:justify-center')}
    >
      <div className="wrap">
        <Reveal className="max-w-[46rem]">
          <p className="t-label text-caramel-700">Mein Konzept</p>
          <h2 id="schwerpunkte-title" className="t-h2 mt-3 text-espresso-900">
            {title ?? (
              <>
                Drei Schritte, die <em className="italic text-caramel-600">aufeinander aufbauen</em>
              </>
            )}
          </h2>
          <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-muted max-md:text-[0.9375rem] max-md:leading-normal compact:hidden">
            {intro ?? 'Erst verstehen, dann bewältigen, dann den Alltag neu gestalten. So wird aus Wissen Schritt für Schritt Veränderung, die bleibt.'}
          </p>
        </Reveal>

        <InView className="step-icons mt-[var(--sec-gap)]" threshold={0.25}>
          <ol className="relative">
            {SCHWERPUNKTE.map((p, i) => (
              <li key={p.nr} className={cn('step-row relative [--gap:clamp(0.75rem,2.2svh,1.5rem)] [--ic:2.75rem] [--pad:0.875rem] md:[--ic:4rem] md:[--pad:clamp(1rem,2.4svh,1.5rem)]', INDENT[i], i > 0 && 'mt-[var(--gap)]')} style={{ '--d': `${i * 0.35}s` } as React.CSSProperties}>
                {/* Verbindung zur nächsten Zeile: senkrecht unter dem Icon, ab Tablet dann waagrecht bis zur nächsten Karte (auf Höhe ihres Icons) */}
                {i < SCHWERPUNKTE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="step-link absolute left-[calc(var(--pad)+var(--ic)/2)] top-[calc(var(--pad)+var(--ic))] h-[calc(100%-var(--pad)-var(--ic)+var(--gap))] rounded-bl-xl border-l border-caramel-400/70 md:h-[calc(100%-var(--ic)/2+var(--gap))] md:w-[calc(12%*100/(100-12*var(--k))-var(--pad)-var(--ic)/2)] md:border-b"
                    style={{ '--k': i } as React.CSSProperties}
                  />
                )}
                <article className="lift-hover floaty relative rounded-lg border border-line bg-white p-[var(--pad)]">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 pr-10 md:pr-14 gap-y-1 md:grid-cols-[auto_minmax(0,15rem)_minmax(0,1fr)] md:gap-x-7 xl:grid-cols-[auto_minmax(0,17rem)_minmax(0,1fr)]">
                    <span className="grid h-[var(--ic)] w-[var(--ic)] shrink-0 place-items-center rounded-md bg-stone text-caramel-700">
                      <StepIcon nr={p.nr} className="h-7 w-7 md:h-10 md:w-10" />
                    </span>
                    <h3 className="flex items-baseline gap-2.5 whitespace-nowrap font-serif text-[1.125rem] leading-tight min-[400px]:text-[1.1875rem] md:whitespace-normal md:text-[clamp(1.1875rem,0.9rem+1.2svh,1.75rem)] tracking-[-0.02em] text-espresso-900">
                      <span className="text-[0.8em] font-medium tabular-nums text-caramel-600 max-md:hidden">0{p.nr}</span>
                      {p.title}
                    </h3>
                    <p className="col-span-2 mt-1.5 text-[0.875rem] leading-snug text-ink/80 md:col-span-1 md:mt-0 md:border-l md:border-line md:pl-7 md:text-[clamp(1rem,0.85rem+0.6svh,1.125rem)]">
                      {p.kurz}
                    </p>
                  </div>
                  {/* Langtext und typische Fragen erst nach Klick auf den Pfeil (im HTML vorhanden, für Suche und KI lesbar) */}
                  <More label={`Mehr zu: ${p.title}`} className="step-more z-10" bodyClassName="max-w-[48rem] pt-3 md:pl-[calc(var(--ic)+1.75rem)]">
                    <p className="leading-relaxed text-ink/85">{p.text}</p>
                    <ul className="mt-3 grid gap-x-6 gap-y-1.5 border-t border-line pt-3 text-[0.9375rem] text-muted sm:grid-cols-2">
                      {p.fragen.map((f) => (
                        <li key={f} className="flex gap-2.5 leading-snug">
                          <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-caramel-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </More>
                </article>
              </li>
            ))}
          </ol>
        </InView>

        {cta && (
          <Reveal className="mt-[var(--sec-gap)] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="group w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <Link href="/mein-ansatz/" className="link inline-flex min-h-11 items-center justify-center font-semibold max-sm:hidden sm:justify-start">
              Mehr über das Konzept erfahren
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
