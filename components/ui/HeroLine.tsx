import { cn } from '@/lib/utils'

/**
 * Große Markenlinie im Hero: kommt ruhig von links, verknotet sich (Stress) und läuft als ruhige, weite Linie aus.
 * Reines SVG, zeichnet sich beim ersten Laden der Startseite (`draw`, CSS .hero-line.intro-draw). Rein dekorativ.
 * `variant`: home (Startseite, Knoten unter dem Text) · page (Unterseiten, Knoten weiter rechts, dezenter)
 */
const PATHS = {
  /* Knoten in der freien Mitte zwischen Text und Karte (Desktop), Linie läuft unter der Karte aus */
  home: 'M-40 640 C 120 636 330 622 520 586 C 660 560 760 520 800 462 C 836 410 812 352 768 362 C 718 374 728 452 796 462 C 866 472 920 410 892 360 C 868 318 812 330 818 384 C 824 446 900 520 1010 548 C 1150 584 1330 600 1660 596',
  /* Handy (Hochformat): Knoten oben rechts zwischen Header und Text, Linie läuft rechts hinaus */
  mobile: 'M-20 196 C 60 196 130 186 182 168 C 232 150 262 122 270 98 C 278 74 260 58 240 64 C 216 72 222 110 254 114 C 288 118 314 90 302 68 C 292 50 264 56 268 82 C 272 110 304 138 352 144 C 380 148 404 148 430 148',
  page: 'M-40 520 C 300 516 620 500 860 470 C 960 457 1030 420 1046 372 C 1062 324 1030 292 994 304 C 950 319 962 396 1026 404 C 1092 412 1146 352 1118 306 C 1094 266 1040 276 1046 330 C 1052 386 1114 446 1220 456 C 1360 470 1500 470 1660 468',
} as const

export function HeroLine({ variant = 'home', draw = false, className }: { variant?: keyof typeof PATHS; draw?: boolean; className?: string }) {
  const mobile = variant === 'mobile'
  return (
    <svg
      viewBox={mobile ? '0 0 400 844' : '0 0 1600 700'}
      preserveAspectRatio={mobile ? 'xMaxYMin slice' : 'xMidYMax slice'}
      aria-hidden="true"
      className={cn('hero-line pointer-events-none absolute inset-0 h-full w-full', draw && 'intro-draw', className)}
      fill="none"
    >
      <path d={PATHS[variant]} pathLength={1} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
