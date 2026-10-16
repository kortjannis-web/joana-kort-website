'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Stapel-Effekt: Das Element bleibt stehen (sticky), das NÄCHSTE Geschwister-Element (Sheet mit runden Ecken, z-10)
 * schiebt sich beim Scrollen darüber. Das stehende Element behält seine Größe (kein Schrumpfen, keine Ränder),
 * es dunkelt nur leicht ab. Höher als der Viewport: bleibt erst stehen, wenn die Unterkante unten ankommt.
 * Nur opacity, bei "Bewegung reduzieren" ohne Abdunkeln.
 * Einsatz: Bild-Hero (+ nachfolgendes Sheet), <main> (+ Footer), Startseite "Lösung" (+ "Alles aus einer Hand").
 */
export function StackBack({
  children,
  className,
  as: Tag = 'div',
  shade = 0.45,
  id,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'main' | 'section'
  /** Abdunklung bei voller Überdeckung */
  shade?: number
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const shadeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let top = 0
    let raf = 0

    // Erst hier sticky: Ohne JS (Skript lädt nicht, z. B. alte Seite nach einem Deploy oder langsames Netz) würde ein Element,
    // das höher als der Bildschirm ist, mit top 0 oben kleben und die Seite ließe sich scheinbar nicht scrollen
    const measure = () => {
      top = Math.min(0, window.innerHeight - el.offsetHeight)
      el.style.top = `${top}px`
      el.style.position = 'sticky'
    }

    const update = () => {
      raf = 0
      const next = el.nextElementSibling as HTMLElement | null
      if (!next || reduce) return
      const vh = window.innerHeight
      const h = el.offsetHeight
      const pinnedBottom = Math.min(vh, top + h)
      const overlap = -parseFloat(getComputedStyle(next).marginTop) || 0
      const start = pinnedBottom - overlap
      const range = Math.max(1, Math.min(start, next.offsetHeight))
      const nextTop = next.getBoundingClientRect().top
      const p = Math.min(1, Math.max(0, (start - nextTop) / range))
      if (p <= 0.001) {
        el.style.visibility = ''
        if (shadeRef.current) shadeRef.current.style.opacity = '0'
        return
      }
      // Vollständig verdeckt: nicht mehr zeichnen (spart Leistung)
      el.style.visibility = p >= 1 && next.getBoundingClientRect().top <= 0 ? 'hidden' : ''
      if (shadeRef.current) shadeRef.current.style.opacity = (p * shade).toFixed(3)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    const ro = new ResizeObserver(onResize)
    ro.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [shade])

  return (
    <Tag ref={ref as never} id={id} className={cn('relative isolate overflow-clip', className)}>
      {children}
      <span
        ref={shadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-espresso-950 opacity-0"
      />
    </Tag>
  )
}
