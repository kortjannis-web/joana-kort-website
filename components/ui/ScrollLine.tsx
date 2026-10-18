'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Begleit-Linie (Thema der Startseite, viermal verteilt): das Motiv der Hero-Schwunglinie kehrt im Hintergrund einer Section wieder.
 * Beim Runterscrollen zeichnet sich die Linie mit (Fortschritt --p), wandert leicht mit nach unten (begleitet den Blick) und ein
 * kleiner Bordeaux-Punkt reitet auf ihrer Spitze. Eine feine Bordeaux-Linie folgt etwas versetzt.
 * Ohne JS und bei reduzierter Bewegung: fertig gezeichnete, ruhige Linie ohne Punkt. Liegt hinter dem Inhalt (Section braucht relative + isolate).
 * Pfade: Desktop 1440 × 900, Handy 400 × 900 (gleichmäßig skaliert, slice), Linien laufen am Rand und kreuzen den Text höchstens unten einmal.
 */
const LINES = {
  /* am linken Rand hinunter, unten ein weiter Schwung nach rechts */
  a: {
    desk: 'M-60 140 C 60 160 92 300 82 460 C 72 640 170 820 520 862 S 1180 830 1500 884',
    mob: 'M-30 60 C 24 120 12 300 12 470 S 26 770 130 856 S 300 896 440 896',
  },
  /* am rechten Rand hinunter, unten ruhiger Auslauf nach links */
  b: {
    desk: 'M1500 60 C 1384 140 1362 300 1366 460 C 1370 640 1318 800 1000 852 S 400 862 -60 890',
    mob: 'M430 40 C 382 120 388 300 388 470 S 374 770 270 856 S 100 896 -40 896',
  },
  /* weite Welle quer durch die untere Hälfte */
  c: {
    desk: 'M-60 520 C 200 420 420 700 700 600 S 1080 360 1260 470 S 1420 640 1500 600',
    mob: 'M-30 842 C 60 784 140 884 230 846 S 360 766 440 806',
  },
  /* von unten links aufsteigend nach rechts oben (zum Schluss-CTA hin) */
  d: {
    desk: 'M-60 860 C 240 840 380 640 560 600 C 760 556 900 700 1080 560 S 1380 220 1500 160',
    mob: 'M-30 900 C 18 820 12 640 14 480 S 40 180 150 80 S 360 20 440 40',
  },
} as const

export function ScrollLine({ variant = 'a', className }: { variant?: keyof typeof LINES; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let visible = false

    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0, sobald die Section unten ins Bild kommt; 1, wenn ihr Ende im oberen Drittel steht
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.45)))
      el.style.setProperty('--p', p.toFixed(4))
      // Punkt auf der Spitze der sichtbaren Hauptlinie (die gerade angezeigte Variante, Desktop oder Handy)
      const path = [...el.querySelectorAll<SVGPathElement>('path.sl-main')].find((x) => x.getClientRects().length > 0)
      const d = dot.current
      if (!path || !d) return
      const m = path.getScreenCTM()
      if (!m) return
      const pt = path.getPointAtLength(path.getTotalLength() * p).matrixTransform(m)
      // relativ zum mitwandernden Container (Parallax), in dem auch der Punkt liegt
      const box = (d.parentElement ?? el).getBoundingClientRect()
      d.style.transform = `translate(${(pt.x - box.left).toFixed(1)}px, ${(pt.y - box.top).toFixed(1)}px)`
      d.style.opacity = p > 0.02 && p < 0.995 ? '1' : '0'
    }
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
        if (visible) onScroll()
      },
      { rootMargin: '20% 0px' }
    )
    io.observe(el)
    el.dataset.live = ''
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const l = LINES[variant]
  const svg = (d: string, box: string, cls: string) => (
    <svg viewBox={box} preserveAspectRatio="xMidYMid slice" className={cn('absolute inset-0 h-full w-full', cls)} fill="none">
      <path className="sl-main" d={d} pathLength={1} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path className="sl-accent stroke-bordeaux" d={d} pathLength={1} strokeOpacity="0.5" strokeWidth="1.1" strokeLinecap="round" transform="translate(14 22)" />
    </svg>
  )
  return (
    <div ref={root} aria-hidden="true" className={cn('scroll-line pointer-events-none absolute inset-0 -z-10 overflow-hidden text-caramel-400/45', className)}>
      <div className="sl-drift absolute inset-0">
        {svg(l.desk, '0 0 1440 900', 'hidden md:block')}
        {svg(l.mob, '0 0 400 900', 'md:hidden')}
        <span ref={dot} className="sl-dot absolute left-0 top-0 -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-bordeaux-bright opacity-0" />
      </div>
    </div>
  )
}
