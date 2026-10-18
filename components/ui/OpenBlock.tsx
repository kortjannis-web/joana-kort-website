import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Offener Block: Regel für Fragebögen, Formulare und Infoblöcke (Entscheidung 18.10.2026).
 * Nur der Kopf ist ein dunkler, abgerundeter Block (Kicker, Titel, optional Zusatz rechts oder darunter). Der Inhalt steht frei
 * darunter, ohne weiße Karte: Eingaben und Einträge als einzelne runde Felder (siehe components/forms/fields.tsx, OpenItem).
 * Ein weicher Papierschein (.fk-open) beruhigt Muster im Hintergrund. Auf dunklen Flächen tone="dark": Kopf etwas dunkler mit
 * feinem Rand, Labels und Hinweise hell (group-data-[tone=dark]/ob).
 */
export function OpenBlock({
  icon,
  kicker,
  title,
  aside,
  head,
  titleAs: TitleTag = 'p',
  titleId,
  tone = 'light',
  className,
  bodyClassName,
  children,
}: {
  icon?: ReactNode
  kicker?: string
  /** Titel im Kopf (Serif, weiß, Akzentwort als <em>) */
  title?: ReactNode
  /** Titel als echte Überschrift, wenn der Block eine eigene Section benennt */
  titleAs?: 'p' | 'h2' | 'h3'
  titleId?: string
  /** rechts in der Kicker-Zeile, z. B. "2 von 4" */
  aside?: ReactNode
  /** zusätzlicher Inhalt im Kopf unter dem Titel, z. B. Schrittpunkte */
  head?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
  bodyClassName?: string
  children: ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <div data-tone={tone} className={cn('fk-open group/ob relative flex flex-col', dark && 'fk-open-dark', className)}>
      <div
        className={cn(
          'grain relative shrink-0 rounded-[1.5rem] px-5 pb-4 pt-4 text-white',
          dark
            ? 'bg-espresso-950/70 ring-1 ring-white/10'
            : 'bg-espresso-800 shadow-[0_3px_6px_rgba(20,14,10,0.14),0_24px_46px_-22px_rgba(20,14,10,0.65)]'
        )}
      >
        {(kicker || aside) && (
          <div className="flex items-center justify-between gap-4">
            {kicker && (
              <span className="flex items-center gap-2 text-caramel-300 [&>svg]:h-4 [&>svg]:w-4">
                {icon}
                <span className="t-label whitespace-nowrap text-[0.6875rem]">{kicker}</span>
              </span>
            )}
            {aside}
          </div>
        )}
        {title && (
          <TitleTag id={titleId} className="mt-1 font-serif text-[1.1875rem] leading-snug text-white [&_em]:italic [&_em]:text-caramel-300">
            {title}
          </TitleTag>
        )}
        {head}
      </div>
      <div className={cn('px-1 pt-5', bodyClassName)}>{children}</div>
    </div>
  )
}

/** Einzelnes freistehendes Feld für Infoblöcke (z. B. Eckdaten): weiß, rund, weicher Schatten */
export function OpenItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-white bg-white/90 px-5 py-3 shadow-[0_2px_4px_rgba(30,22,17,0.06),0_12px_26px_-14px_rgba(30,22,17,0.48)]',
        className
      )}
    >
      {children}
    </div>
  )
}

/** Hinweis als offener Block (Abgrenzung, Wichtig, Beispiel): Titel im dunklen Kopf, Text frei darunter, auf Lesebreite begrenzt */
export function InfoNote({
  kicker = 'Hinweis',
  title,
  titleAs,
  titleId,
  className,
  children,
}: {
  kicker?: string
  title: ReactNode
  titleAs?: 'p' | 'h2' | 'h3'
  titleId?: string
  className?: string
  children: ReactNode
}) {
  return (
    <OpenBlock
      icon={<Info strokeWidth={1.75} aria-hidden="true" />}
      kicker={kicker}
      title={title}
      titleAs={titleAs}
      titleId={titleId}
      className={cn('max-w-[46rem]', className)}
      bodyClassName="pl-2 text-[0.9375rem] leading-relaxed text-ink/85 md:text-base"
    >
      {children}
    </OpenBlock>
  )
}
