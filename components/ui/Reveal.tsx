'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Dezentes Einblenden beim Scrollen. Nur opacity + transform, einmalig. Nie im Hero verwenden. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const Comp = as === 'li' ? m.li : as === 'section' ? m.section : m.div
  // Startwert immer gleich (Server und Browser rendern dasselbe HTML, sonst bleibt der Block bei "Bewegung reduzieren" unsichtbar).
  // Bei "Bewegung reduzieren" ohne Dauer: der Block steht sofort da
  return (
    <LazyMotion features={domAnimation} strict>
      <Comp
        className={className}
        data-reveal=""
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </Comp>
    </LazyMotion>
  )
}
