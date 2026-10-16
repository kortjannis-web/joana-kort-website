'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { LogoMark } from '@/components/layout/Logo'
import { cn } from '@/lib/utils'

/**
 * Markenlinie zeichnet sich einmal (Knoten, dann ruhiger Auslauf, zuletzt der Punkt).
 * `play`: sofort beim Einblenden (Formular-Bestätigung), sonst sobald sichtbar. CSS: `.logo-draw` in globals.css.
 * Ohne JS und bei "Bewegung reduzieren" steht die fertige Linie da.
 */
export function LogoDraw({ className, play = false }: { className?: string; play?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState<'idle' | 'ready' | 'on'>('idle')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setState('ready')
    if (play) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setState('on')))
      return () => cancelAnimationFrame(r)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState('on')
          io.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play])

  return (
    <span ref={ref} data-draw={state} className={cn('logo-draw inline-block', className)}>
      <LogoMark className="h-full w-auto" strokeWidth={1.8} />
    </span>
  )
}
