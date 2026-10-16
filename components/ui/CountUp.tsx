'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const inViewOnce = (el: Element, cb: () => void, threshold = 0.4) => {
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        cb()
        io.disconnect()
      }
    },
    { threshold }
  )
  io.observe(el)
  return () => io.disconnect()
}

/**
 * Zahl zählt einmalig hoch, sobald sie im Bild ist (ease-out), und wächst dabei leicht (scale).
 * Server-HTML enthält den Endwert (SEO, ohne JS korrekt). Bei "Bewegung reduzieren" sofort der Endwert.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const [text, setText] = useState(fmt(value))
  const [run, setRun] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setText(fmt(0))
    return inViewOnce(el, () => {
      setRun(true)
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration)
        const e = 1 - Math.pow(1 - p, 3)
        setText(fmt(value * e))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, duration])

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block tabular-nums transition-transform duration-700 ease-[var(--ease-lift)]',
        run ? 'scale-100' : 'scale-[0.92]',
        className
      )}
    >
      {prefix}
      {text}
      {suffix}
    </span>
  )
}

/**
 * Balken/Skala wächst einmalig aus dem Nullpunkt, sobald sichtbar (nur transform).
 * axis x: von links (scaleX) · y: von unten (scaleY). `delay` in s für gestaffelte Balken.
 */
export function Grow({
  children,
  axis = 'x',
  delay = 0,
  className,
}: {
  children?: ReactNode
  axis?: 'x' | 'y'
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(true)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setOn(false)
    return inViewOnce(el, () => requestAnimationFrame(() => setOn(true)), 0.3)
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        'transition-transform duration-[1200ms] ease-[var(--ease-lift)]',
        axis === 'x' ? 'origin-left' : 'origin-bottom',
        !on && (axis === 'x' ? 'scale-x-0' : 'scale-y-0'),
        className
      )}
    >
      {children}
    </div>
  )
}
