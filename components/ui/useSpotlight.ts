'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Wandernder Fokus über eine Liste: alle `interval` ms ist das nächste Element aktiv.
 * Maus darauf: genau dieses bleibt aktiv, der Loop pausiert. Maus weg: weiter ab diesem Element.
 * Touch/Tastatur: Tippen oder Fokus setzt das Element, der Loop läuft weiter.
 * Läuft nur, solange die Liste sichtbar ist (oder `gate` wahr ist, wenn angegeben: dann springt der Fokus beim Verlassen zurück auf das
 * erste Element, und der Takt beginnt erst, wenn `gate` wieder wahr wird). Bei "Bewegung reduzieren" kein Auto-Wechsel.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>(count: number, interval = 3000, gate?: boolean) {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const on = gate ?? visible
  useEffect(() => {
    if (gate === false) setActive(0)
  }, [gate])

  useEffect(() => {
    if (paused || !on || reduce || count < 2) return
    const t = setInterval(() => setActive((a) => (a + 1) % count), interval)
    return () => clearInterval(t)
  }, [paused, on, reduce, count, interval, active])

  const bind = (i: number) => ({
    'data-active': active === i,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      setActive(i)
      setPaused(true)
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setPaused(false)
    },
    onClick: () => setActive(i),
    onFocus: () => setActive(i),
  })

  return { ref, active, setActive, bind }
}
