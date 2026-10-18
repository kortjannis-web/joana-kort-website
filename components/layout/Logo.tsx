import { cn } from '@/lib/utils'

/**
 * Markenlinie: eine einzige Linie, die sich erst verknotet (Stress) und dann ruhig ausläuft (Umgang damit), am Ende ein Punkt.
 * Nicht im Logo, sondern als Gestaltungselement (Hero-Linie, Footer-CTA, Formular-Bestätigung, Icons).
 */
export const KNOT_PATH =
  'M3 31 C9 31 12 13 22 12 C31 11 33.5 24 26 25.5 C18.5 27 18.5 9 31 8.5 C43 8 41 27 51 28.5 C57 29.4 63 28.6 70 28.6'

export function LogoMark({ className, title, strokeWidth = 2.2 }: { className?: string; title?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 76 40" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} fill="none">
      <path className="knot-line" d={KNOT_PATH} pathLength={1} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle className="knot-dot" cx="72.6" cy="28.6" r="2.3" fill="currentColor" />
    </svg>
  )
}

/**
 * Textlogo: "Joana Kort" in Manrope, darunter eine feine Karamell-Linie und "STRESSBERATUNG" gesperrt (wie die Labels in Joanas Materialien).
 * `draw`: Intro der Startseite (globals.css): Name wischt herein, die Linie zieht sich, dann "Stressberatung".
 * `data-logo` markiert das Ende des Logos (Header misst daran, wie weit die Handy-Pille ausfahren darf).
 */
export function Logo({ tone = 'dark', draw = false, className }: { tone?: 'dark' | 'light'; draw?: boolean; className?: string }) {
  return (
    <span data-logo className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn(
          'whitespace-nowrap font-serif text-[1.45rem] font-bold tracking-[-0.03em] min-[400px]:text-[1.55rem] md:text-[1.75rem]',
          tone === 'dark' ? 'text-espresso-800' : 'text-white',
          draw && 'logo-intro-name'
        )}
      >
        Joana Kort
      </span>
      <span className="mt-[0.4rem] flex items-center gap-2">
        <span aria-hidden="true" className={cn('logo-rule h-px w-5 origin-left md:w-6', tone === 'dark' ? 'bg-caramel-500' : 'bg-caramel-300', draw && 'logo-intro-rule')} />
        <span
          className={cn(
            'whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.34em] md:text-[0.64rem]',
            tone === 'dark' ? 'text-caramel-700' : 'text-caramel-300',
            draw && 'logo-intro-sub'
          )}
        >
          Stressberatung
        </span>
      </span>
    </span>
  )
}
