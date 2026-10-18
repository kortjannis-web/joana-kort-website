import { cn } from '@/lib/utils'

/**
 * Große Markenlinie im Hero: kommt ruhig von links, verknotet sich (Stress) und läuft als ruhige, weite Linie aus. Ringe bewusst groß (18.10.2026).
 * Reines SVG, zeichnet sich beim ersten Laden der Startseite (`draw`, CSS .hero-line.intro-draw). Rein dekorativ.
 * `variant`: home (Startseite, Knoten unter dem Text) · page (Unterseiten, Knoten weiter rechts, dezenter)
 */
const PATHS = {
  /* Knoten in der freien Mitte zwischen Text und Karte (Desktop), Linie läuft unter der Karte aus */
  home: 'M-40 640 C 120 636 330 622 520 586 C 660 560 739 553 786 485 C 838 410 803 326 739 340 C 667 358 681 471 780 485 C 881 500 960 410 919 338 C 884 277 803 294 812 372 C 820 462 900 520 1010 548 C 1150 584 1330 600 1660 596',
  /* Handy (Hochformat): Knoten oben rechts zwischen Header und Text, Linie läuft rechts hinaus */
  mobile: 'M-20 196 C 60 196 130 186 182 168 C 232 150 263 125 272 100 C 282 69 259 48 233 56 C 202 66 209 115 251 121 C 295 126 329 89 313 61 C 300 37 264 45 269 79 C 274 115 304 138 352 144 C 380 148 404 148 430 148',
  page: 'M-40 520 C 300 516 620 500 860 470 C 960 457 1020 432 1038 378 C 1060 311 1016 266 965 283 C 904 304 920 412 1010 423 C 1102 434 1178 350 1139 286 C 1105 230 1030 244 1038 320 C 1046 398 1114 446 1220 456 C 1360 470 1500 470 1660 468',
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
