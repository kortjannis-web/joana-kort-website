import { cn } from '@/lib/utils'

/**
 * Große Schwunglinie im Hero (Entscheidung 18.10.2026, löst die Knoten-Linie ab): ein weites, weiches Band über die ganze Fläche,
 * darin zwei Linien (Karamell und eine feine Bordeaux-Linie), oben rechts ein weiter Bogen. Zeichnet sich beim Laden (intro-draw),
 * danach wandert ein kleiner leuchtender Bordeaux-Punkt die Linie entlang und das Band atmet langsam (globals.css .swoosh).
 * Dasselbe Motiv kehrt beim Scrollen als Begleit-Linie wieder (ScrollLine). Rein dekorativ, ohne JS und bei reduzierter Bewegung statisch.
 * `variant`: home (Startseite Desktop/Tablet) · mobile (Startseite Handy, Schwung oben über dem Text) · page (Unterseiten, dezenter)
 */
const V = {
  home: {
    box: '0 0 1600 900',
    aspect: 'xMidYMid slice',
    band: 'M-120 640 C 260 520 560 780 900 650 S 1420 420 1720 520 L 1720 650 C 1420 570 1220 800 900 780 S 280 660 -120 790 Z',
    main: 'M-120 700 C 250 590 560 840 900 712 S 1410 470 1720 575',
    accent: 'M-120 742 C 270 640 580 880 920 752 S 1430 530 1720 625',
    arc: 'M820 -60 C 1000 120 1180 300 1420 320 S 1640 300 1720 270',
  },
  mobile: {
    box: '0 0 400 844',
    aspect: 'xMidYMin slice',
    band: 'M-40 250 C 60 150 180 330 290 230 S 420 90 460 110 L 460 190 C 420 170 380 330 290 320 S 70 260 -40 340 Z',
    main: 'M-40 290 C 70 190 190 370 300 268 S 420 120 460 140',
    accent: 'M-40 320 C 80 225 200 400 312 300 S 425 160 460 178',
    arc: 'M210 -30 C 260 40 330 90 460 70',
  },
  page: {
    box: '0 0 1600 700',
    aspect: 'xMidYMax slice',
    band: 'M-120 560 C 300 470 640 640 980 540 S 1460 380 1720 430 L 1720 520 C 1460 480 1300 650 980 640 S 300 560 -120 650 Z',
    main: 'M-120 600 C 290 510 640 690 980 590 S 1450 420 1720 470',
    accent: 'M-120 632 C 310 548 660 720 1000 622 S 1470 460 1720 508',
    arc: 'M900 -60 C 1060 100 1240 220 1460 230 S 1660 210 1720 190',
  },
} as const

export function Swoosh({ variant = 'home', draw = false, className }: { variant?: keyof typeof V; draw?: boolean; className?: string }) {
  const v = V[variant]
  const fill = `sw-fill-${variant}`
  const glow = `sw-glow-${variant}`
  return (
    <svg
      viewBox={v.box}
      preserveAspectRatio={v.aspect}
      aria-hidden="true"
      className={cn('swoosh pointer-events-none absolute inset-0 h-full w-full', draw && 'intro-draw', className)}
      fill="none"
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="0.35" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="0.75" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="sw-drift">
        <path className="sw-band" d={v.band} fill={`url(#${fill})`} />
        <path className="sw-line" d={v.arc} pathLength={1} stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.3" strokeLinecap="round" />
        <path className="sw-line" d={v.main} pathLength={1} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="sw-line sw-late stroke-bordeaux" d={v.accent} pathLength={1} strokeOpacity="0.6" strokeWidth="1.3" strokeLinecap="round" />
        <path className="sw-spark stroke-bordeaux-bright" d={v.main} pathLength={1} strokeWidth="3.2" strokeLinecap="round" filter={`url(#${glow})`} />
      </g>
    </svg>
  )
}
