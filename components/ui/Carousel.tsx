'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Wischbare Reihe (Scroll-Snap, kein Karussell-Skript):
 * - Pfeile links/rechts neben der Reihe, nur dort, wo es weitergeht (ganz links nur rechts usw.), ab Tablet
 * - Punkte darunter zeigen die Position (bei vielen Seiten als wandernder Ausschnitt)
 * - Handy: die aktive Karte steht immer mittig, links und rechts schauen die Nachbarn heraus
 * - Pfeile und Autoplay gleiten zügig (ca. 0,45 s, weich auslaufend) statt des langsamen Browser-Scrollens
 * - `autoplay` (ms): wechselt selbst weiter und springt am Ende an den Anfang (Loop). Pausiert bei Berührung,
 *   Maus darüber oder außerhalb des Viewports. Nach jeder Bedienung (Wischen, Pfeil, Punkt) startet der Timer neu und wechselt
 *   `autoplay` ms nach dem Loslassen weiter. Bei "Bewegung reduzieren" kein Auto-Wechsel.
 * - Jede Karte bekommt data-active (mittlere bzw. erste sichtbare Karte), z. B. für .glow-icon / .lift-tile
 * - `bleed` (ab Tablet): Reihe ragt seitlich über den Inhalt hinaus und blendet dort weich aus. Schatten werden nicht
 *   abgeschnitten, neue Karten gleiten von weiter außen herein, Pfeile sitzen weiter außen
 * - `gridFrom`: ab diesem Breakpoint normales Raster statt Reihe (ohne Pfeile/Punkte/Autoplay)
 *
 * Breiten über CSS-Variablen der Reihe: --item (Handy, in vw, die Reihe ist dort bildschirmbreit), --item-md (Tablet), --item-xl (Desktop).
 */
export function Carousel({
  children,
  label,
  labelledBy,
  autoplay,
  item = '82vw',
  itemMd = 'calc((100% - 1.25rem) / 2)',
  itemXl = 'calc((100% - 3rem) / 3)',
  gridFrom,
  gridClass,
  className,
  itemClassName,
  arrowLabel = 'Einträge',
  dots = true,
  tone = 'light',
  onActiveChange,
  playing = true,
  api,
  bleed = false,
}: {
  children: ReactNode
  label?: string
  labelledBy?: string
  autoplay?: number
  item?: string
  itemMd?: string
  itemXl?: string
  gridFrom?: 'md' | 'xl'
  /** Rasterklassen ab gridFrom, z. B. "xl:grid-cols-4 xl:gap-6" */
  gridClass?: string
  className?: string
  itemClassName?: string
  /** "Bewertungen" → "Nächste Bewertungen" */
  arrowLabel?: string
  dots?: boolean
  /** dark: Punkte/Pfeile auf Espresso */
  tone?: 'light' | 'dark'
  /** Meldet die aktive (mittlere) Karte, z. B. um eine Illustration mitzuschalten */
  onActiveChange?: (i: number) => void
  /** Steuerung von außen, z. B. automatisch zur Karte i gleiten (Werte/Zitat auf der Startseite mobil) */
  api?: React.RefObject<{ to: (i: number) => void } | null>
  bleed?: boolean
  /** false: Autoplay ruht und die Reihe steht wieder am Anfang; beim Wechsel auf true beginnt der Takt neu (Standard true) */
  playing?: boolean
}) {
  const items = Children.toArray(children)
  const track = useRef<HTMLUListElement>(null)
  const [state, setState] = useState({ active: 0, page: 0, pages: 1, start: true, end: true, scrollable: false })
  // Zeitpunkt der letzten Bedienung / des letzten Autoplay-Schritts: der nächste Wechsel kommt `autoplay` ms danach
  const last = useRef(Date.now())
  const touching = useRef(false)
  const hover = useRef(false)
  const visible = useRef(false)
  const onActive = useRef(onActiveChange)
  onActive.current = onActiveChange

  useEffect(() => {
    onActive.current?.(state.active)
  }, [state.active])

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const lis = Array.from(el.children) as HTMLElement[]
    if (!lis.length) return
    const max = el.scrollWidth - el.clientWidth
    const scrollable = max > 4 && getComputedStyle(el).display !== 'grid'
    const first = lis[0].getBoundingClientRect()
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = first.width + gap
    const perView = Math.max(1, Math.floor((el.clientWidth + gap + 2) / step))
    const pages = scrollable ? Math.max(1, Math.round(max / (step * perView)) + 1) : 1
    // Aktive Karte: die, deren Mitte der Mitte der Reihe (Handy) bzw. dem Anfang (ab Tablet) am nächsten ist
    const box = el.getBoundingClientRect()
    const centered = perView === 1
    const ref = centered ? box.left + box.width / 2 : box.left + parseFloat(getComputedStyle(el).scrollPaddingLeft || '0')
    let active = 0
    let best = Infinity
    lis.forEach((li, i) => {
      const r = li.getBoundingClientRect()
      const d = Math.abs((centered ? r.left + r.width / 2 : r.left) - ref)
      if (d < best) {
        best = d
        active = i
      }
    })
    const page = max > 0 ? Math.round((el.scrollLeft / max) * (pages - 1)) : 0
    setState({ active, page, pages, start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4, scrollable })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      // Wischen/Nachlaufen von Hand: Timer startet nach dem Loslassen neu (eigenes Gleiten zählt nicht)
      if (!el.dataset.glide) last.current = Date.now()
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          measure()
        })
    }
    measure()
    el.addEventListener('scroll', onScroll, { passive: true })
    const ro = new ResizeObserver(onScroll)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => {
      el.removeEventListener('scroll', onScroll)
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [measure])

  const stepSize = () => {
    const el = track.current
    const li = el?.children[0] as HTMLElement | undefined
    if (!el || !li) return { el: null, step: 0, perView: 1 }
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = li.getBoundingClientRect().width + gap
    const perView = Math.max(1, Math.floor((el.clientWidth + gap + 2) / step))
    return { el, step, perView }
  }

  const go = (dir: 1 | -1) => {
    const { el, step, perView } = stepSize()
    if (!el || !step) return
    const max = el.scrollWidth - el.clientWidth
    const from = Math.round(el.scrollLeft / step) * step
    glide(el, Math.min(max, Math.max(0, from + dir * step * perView)))
  }

  const toPage = (p: number) => {
    const { el, step, perView } = stepSize()
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    glide(el, Math.min(max, p * step * perView))
  }

  useEffect(() => {
    last.current = Date.now()
    if (!playing && track.current) track.current.scrollLeft = 0
  }, [playing])

  // Autoplay (Loop)
  useEffect(() => {
    if (!autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      const el = track.current
      if (!el || !playing || !visible.current || hover.current || touching.current || Date.now() - last.current < autoplay) return
      last.current = Date.now()
      const max = el.scrollWidth - el.clientWidth
      if (max <= 4 || getComputedStyle(el).display === 'grid') return
      // Ende erreicht, sobald keine ganze Karte mehr folgt (mobil rastet die letzte Karte mittig ein, also vor max)
      const { step } = stepSize()
      if (el.scrollLeft >= max - Math.max(4, step / 2)) glide(el, 0, 650)
      else go(1)
    }, 100)
    return () => clearInterval(t)
  }, [autoplay, playing])

  if (api)
    api.current = {
      to: (i) => {
        const { el, step } = stepSize()
        if (!el || !step) return
        glide(el, Math.min(el.scrollWidth - el.clientWidth, i * step), 650)
      },
    }

  const hold = () => {
    last.current = Date.now()
  }

  const vars = { '--item': item, '--item-md': itemMd, '--item-xl': itemXl } as React.CSSProperties
  const dark = tone === 'dark'

  return (
    // contain inline-size: die breite Reihe darf das umgebende Grid/Flex nicht aufdehnen
    <div className={cn('relative w-full min-w-0 [contain:inline-size]', className)}>
      <div className="relative">
        <ul
          ref={track}
          aria-label={label}
          aria-labelledby={labelledBy}
          style={vars}
          onPointerDown={() => ((touching.current = true), hold())}
          onPointerUp={() => ((touching.current = false), hold())}
          onPointerCancel={() => ((touching.current = false), hold())}
          onWheel={hold}
          onFocus={hold}
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => ((hover.current = false), hold())}
          className={cn(
            'flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            // Aufgeklappter Langtext (More) verlängert nur die eigene Karte, die Nachbarn behalten ihre Höhe
            'has-[details[open]]:items-start',
            // Handy: mittig einrasten, Rand so breit, dass auch erste und letzte Karte mittig stehen können
            '-mx-5 px-[calc((100vw-var(--item))/2)] pb-10 pt-3 -mb-6 -mt-3',
            // ab Tablet: am Anfang einrasten
            bleed
              ? 'md:-mx-8 md:scroll-px-8 md:px-8 md:gap-5 md:[mask-image:linear-gradient(90deg,transparent,#000_2rem,#000_calc(100%-2rem),transparent)] xl:-mx-16 xl:scroll-px-16 xl:px-16 xl:gap-6 xl:[mask-image:linear-gradient(90deg,transparent,#000_4rem,#000_calc(100%-4rem),transparent)]'
              : 'md:-mx-4 md:scroll-px-4 md:px-4 md:gap-5 xl:gap-6',
            gridFrom === 'md' && cn('md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0 md:pt-0 md:mb-0 md:mt-0', gridClass),
            gridFrom === 'xl' && cn('xl:mx-0 xl:grid xl:overflow-visible xl:px-0 xl:pb-0 xl:pt-0 xl:mb-0 xl:mt-0', gridClass)
          )}
        >
          {items.map((child, i) => (
            <li
              key={i}
              data-active={state.scrollable && state.active === i}
              className={cn(
                'w-[var(--item)] shrink-0 snap-center md:w-[var(--item-md)] md:snap-start xl:w-[var(--item-xl)]',
                gridFrom === 'md' && 'md:w-auto xl:w-auto',
                gridFrom === 'xl' && 'xl:w-auto',
                itemClassName
              )}
            >
              {child}
            </li>
          ))}
        </ul>

        {state.scrollable && (
          <>
            <Arrow dir={-1} hidden={state.start} far={bleed} label={arrowLabel} onClick={() => (hold(), go(-1))} />
            <Arrow dir={1} hidden={state.end} far={bleed} label={arrowLabel} onClick={() => (hold(), go(1))} />
          </>
        )}
      </div>

      {dots && state.scrollable && state.pages > 1 && (
        <Dots count={state.pages} active={state.page} dark={dark} label={arrowLabel} onSelect={(p) => (hold(), toPage(p))} />
      )}
    </div>
  )
}

/** Zügiges, weich auslaufendes Scrollen (Snap währenddessen aus, danach rastet es wieder ein) */
function glide(el: HTMLElement, left: number, duration = 450) {
  const from = el.scrollLeft
  const dist = left - from
  if (Math.abs(dist) < 1) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollLeft = left
    return
  }
  const t0 = performance.now()
  el.dataset.glide = '1'
  el.style.scrollSnapType = 'none'
  const frame = (t: number) => {
    const k = Math.min(1, (t - t0) / duration)
    el.scrollLeft = from + dist * (1 - Math.pow(1 - k, 3))
    if (k < 1) requestAnimationFrame(frame)
    else {
      el.style.scrollSnapType = ''
      delete el.dataset.glide
    }
  }
  requestAnimationFrame(frame)
}

function Arrow({ dir, hidden, far, label, onClick }: { dir: 1 | -1; hidden: boolean; far: boolean; label: string; onClick: () => void }) {
  const Icon = dir === 1 ? ChevronRight : ChevronLeft
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      aria-label={dir === 1 ? `Nächste ${label}` : `Vorherige ${label}`}
      className={cn(
        'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-espresso-800 shadow-[0_8px_20px_-8px_rgba(30,22,17,0.45)] transition-[opacity,transform,border-color] duration-300 ease-[var(--ease-soft)] hover:border-caramel-500 active:scale-95 md:grid',
        dir === 1
          ? far
            ? 'right-0 md:-right-7 xl:-right-[clamp(2.75rem,calc(50vw-37.75rem),4.75rem)]'
            : 'right-0 md:-right-3 xl:-right-6'
          : far
            ? 'left-0 md:-left-7 xl:-left-[clamp(2.75rem,calc(50vw-37.75rem),4.75rem)]'
            : 'left-0 md:-left-3 xl:-left-6',
        hidden ? 'pointer-events-none scale-90 opacity-0' : 'opacity-100'
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}

/** Punkte; bei mehr als 9 Seiten ein wandernder Ausschnitt (Randpunkte kleiner) */
function Dots({ count, active, dark, label, onSelect }: { count: number; active: number; dark: boolean; label: string; onSelect: (i: number) => void }) {
  const WINDOW = 9
  const DOT = 18 // Breite je Punkt-Button inkl. Abstand (px), Touch-Fläche über Höhe
  const windowed = count > WINDOW
  const offset = windowed ? Math.min(Math.max(0, active - Math.floor(WINDOW / 2)), count - WINDOW) : 0
  return (
    <div className="mt-4 flex justify-center md:mt-6">
      <div className="overflow-hidden" style={{ width: (windowed ? WINDOW : count) * DOT + 8 }}>
        <div
          className="flex transition-transform duration-500 ease-[var(--ease-soft)]"
          style={{ transform: `translateX(${-offset * DOT}px)` }}
        >
          {Array.from({ length: count }, (_, i) => {
            const dist = windowed ? Math.min(i - offset, offset + WINDOW - 1 - i) : 9
            const small = windowed && dist === 0 && i !== 0 && i !== count - 1
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`${label}: Seite ${i + 1} von ${count}`}
                aria-current={i === active ? 'true' : undefined}
                className="grid h-8 shrink-0 place-items-center"
                style={{ width: i === active ? DOT + 8 : DOT }}
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-soft)]',
                    i === active ? 'w-[1.375rem]' : 'w-1.5',
                    i === active ? (dark ? 'bg-caramel-300' : 'bg-espresso-800') : dark ? 'bg-white/30' : 'bg-[#ddd3c6]',
                    small && 'scale-75'
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
