'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Parallax für Bilder mitten auf der Seite: die Ebene ist etwas höher als ihr Rahmen und verschiebt sich
 * je nach Position im Viewport leicht gegen die Scrollrichtung (nur transform). Eltern-Element: relative + overflow-hidden.
 * Bei "Bewegung reduzieren" statisch.
 */
export function ParallaxLayer({ children, strength = 0.08, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const box = el?.parentElement
    if (!el || !box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = box.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -100 || r.top > vh + 100) return
      // -1 (Bild unten im Viewport) bis 1 (Bild oben)
      const p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)
      el.style.transform = `translate3d(0, ${(p * strength * r.height).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={ref} className={cn('absolute inset-x-0 -inset-y-[10%] will-change-transform', className)}>
      {children}
    </div>
  )
}
