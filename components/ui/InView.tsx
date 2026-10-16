'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Setzt `data-view` für CSS-Animationen beim Hinscrollen: idle (Server, ohne JS, Bewegung reduziert: Endzustand),
 * ready (Startzustand, versteckt) → on (einmal, sobald sichtbar). Die Animation selbst steht im CSS.
 */
export function InView({
  children,
  className,
  threshold = 0.35,
  ...rest
}: { children: ReactNode; className?: string; threshold?: number } & Record<`data-${string}`, string | undefined>) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'ready' | 'on'>('idle')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setState('ready')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => setState('on'))
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return (
    <div ref={ref} data-view={state} className={className} {...rest}>
      {children}
    </div>
  )
}
