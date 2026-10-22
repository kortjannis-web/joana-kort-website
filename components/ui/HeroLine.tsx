import { cn } from '@/lib/utils'

/**
 * Große Markenlinie im Hero, zeichnet sich beim ersten Laden (`draw`, CSS .hero-line.intro-draw). Rein dekorativ, reines SVG.
 * Startseite: home (Doppel-Knoten zwischen Text und Fragebogen) und mobile. Unterseiten: jede Seite ein eigenes Motiv (Entscheidung 22.10.2026),
 * alle laufen unten bzw. rechts vom Text, damit er frei bleibt (viewBox 1600 × 700, unten bündig).
 * knot (Doppel-Knoten) · loop (Riesen-Looping) · wave (starke Welle) · infinity (liegende Acht, zwei Schleifen) · spiral (Schnecke vom Rand)
 * · arcs (drei Bögen wie ein Regenbogen) · breath (Welle, die von rechts nach links ruhig wird: Stress wird zu Ruhe) · ribbon (zwei parallele Schwünge)
 */
const PATHS = {
  /* Knoten in der freien Mitte zwischen Text und Karte (Desktop), Linie läuft unter der Karte aus */
  home: ['M-40 640 C 120 636 330 622 520 586 C 660 560 739 553 786 485 C 838 410 803 326 739 340 C 667 358 681 471 780 485 C 881 500 960 410 919 338 C 884 277 803 294 812 372 C 820 462 900 520 1010 548 C 1150 584 1330 600 1660 596'],
  /* Handy (Hochformat): Knoten oben rechts zwischen Header und Text, Linie läuft rechts hinaus */
  mobile: ['M-20 196 C 60 196 130 186 182 168 C 232 150 263 125 272 100 C 282 69 259 48 233 56 C 202 66 209 115 251 121 C 295 126 329 89 313 61 C 300 37 264 45 269 79 C 274 115 304 138 352 144 C 380 148 404 148 430 148'],
  knot: ['M-40 520 C 300 516 620 500 860 470 C 960 457 1020 432 1038 378 C 1060 311 1016 266 965 283 C 904 304 920 412 1010 423 C 1102 434 1178 350 1139 286 C 1105 230 1030 244 1038 320 C 1046 398 1114 446 1220 456 C 1360 470 1500 470 1660 468'],
  loop: ['M-40 600 C 360 600 760 590 1000 540 C 1250 488 1420 380 1400 230 C 1380 90 1200 50 1110 150 C 1010 260 1080 470 1290 540 C 1420 584 1540 590 1660 588'],
  wave: ['M-40 560 C 200 560 360 520 520 520 C 700 520 760 660 900 660 C 1060 660 1080 300 1240 300 C 1400 300 1420 600 1560 600 C 1610 600 1640 590 1660 580'],
  infinity: [
    'M-40 600 C 600 600 960 470 1080 470 C 1140 470 1150 400 1180 360 C 1210 320 1225 250 1280 250 C 1335 250 1380 300 1380 360 C 1380 420 1335 470 1280 470 C 1225 470 1210 400 1180 360 C 1150 320 1135 250 1080 250 C 1025 250 980 300 980 360 C 980 440 1040 520 1180 560 C 1350 608 1500 610 1660 606',
  ],
  spiral: ['M1660 140 C 1440 120 1200 170 1130 330 C 1070 470 1180 590 1320 560 C 1440 534 1470 400 1390 340 C 1320 290 1220 330 1230 410 C 1238 470 1310 480 1340 440'],
  arcs: ['M1040 760 A 260 260 0 0 1 1560 760', 'M970 760 A 330 330 0 0 1 1630 760', 'M900 760 A 400 400 0 0 1 1700 760'],
  breath: ['M-40 560 C 200 560 400 560 560 556 C 680 552 720 520 780 520 C 850 520 860 600 930 600 C 1010 600 1020 470 1100 470 C 1190 470 1200 660 1290 660 C 1390 660 1400 380 1500 380 C 1580 380 1620 520 1660 560'],
  ribbon: [
    'M-40 640 C 400 660 700 600 940 460 C 1160 330 1360 300 1660 340',
    'M-40 680 C 420 700 760 640 1000 500 C 1210 378 1400 352 1660 392',
  ],
} as const

export type HeroLineVariant = keyof typeof PATHS

export function HeroLine({ variant = 'home', draw = false, className }: { variant?: HeroLineVariant; draw?: boolean; className?: string }) {
  const mobile = variant === 'mobile'
  return (
    <svg
      viewBox={mobile ? '0 0 400 844' : '0 0 1600 700'}
      preserveAspectRatio={mobile ? 'xMaxYMin slice' : 'xMidYMax slice'}
      aria-hidden="true"
      className={cn('hero-line pointer-events-none absolute inset-0 h-full w-full', draw && 'intro-draw', className)}
      fill="none"
    >
      {PATHS[variant].map((d, i) => (
        <path key={i} d={d} pathLength={1} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={i ? ({ '--i': i } as React.CSSProperties) : undefined} />
      ))}
    </svg>
  )
}
