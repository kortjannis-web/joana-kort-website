import { cn } from '@/lib/utils'

/**
 * Markenzeichen: eine einzige Linie, die sich erst verknotet (Stress) und dann ruhig ausläuft (Umgang damit), am Ende ein Punkt.
 * Gleiche Linie groß im Hero (HeroLine). pathLength 1, damit die Zeichen-Animation (globals.css) unabhängig von der Länge ist.
 */
export const KNOT_PATH =
  'M3 31 C9 31 12 13 22 12 C31 11 33.5 24 26 25.5 C18.5 27 18.5 9 31 8.5 C43 8 41 27 51 28.5 C57 29.4 63 28.6 70 28.6'

export function LogoMark({ className, title, strokeWidth = 2.2 }: { className?: string; title?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 76 40"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <path className="knot-line" d={KNOT_PATH} pathLength={1} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle className="knot-dot" cx="72.6" cy="28.6" r="2.3" fill="currentColor" />
    </svg>
  )
}

/**
 * Logo: Linie + "Joana Kort" (Playfair) + "STRESSBERATUNG" (Versalien, gesperrt), angelehnt an Joanas Materialien.
 * `draw`: Intro der Startseite (globals.css): Linie zeichnet sich, Name wischt herein, dann "Stressberatung".
 */
export function Logo({ tone = 'dark', draw = false, className }: { tone?: 'dark' | 'light'; draw?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 min-[400px]:gap-2.5', className)}>
      <span className={cn('shrink-0', draw && 'logo-intro')}>
        <LogoMark className={cn('block h-7 w-auto min-[400px]:h-8 md:h-9', tone === 'dark' ? 'text-caramel-600' : 'text-terra-300')} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'whitespace-nowrap font-serif text-[1.2rem] font-[450] tracking-[-0.005em] max-[380px]:text-[1.08rem] min-[430px]:text-[1.3rem] md:text-[1.45rem]',
            tone === 'dark' ? 'text-espresso-800' : 'text-white',
            draw && 'logo-intro-name'
          )}
        >
          Joana Kort
        </span>
        <span
          className={cn(
            'mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] max-[380px]:tracking-[0.24em] md:text-[0.66rem]',
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
