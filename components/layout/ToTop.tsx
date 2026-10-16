'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Dezenter Pfeil unten mittig: erscheint weich (Transparenz), sobald 30 % der Seite gescrollt sind, Tippen führt nach oben zum Seitenanfang.
 * Form: eine einzelne feine Linie, als Pfeilspitze nach oben geknickt (kein geschlossenes Dreieck), flach und breit (20 % breiter als zuvor),
 * in Espresso mit zartem hellen Hof, damit sie auch auf dunklen Flächen lesbar bleibt.
 */
export function ToTop() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setShow(max > 0 && window.scrollY / max >= 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <button
      type="button"
      aria-label="Nach oben zum Seitenanfang"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
      }
      className={cn(
        'fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-1/2 z-30 grid h-11 w-16 -translate-x-1/2 place-items-center transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] md:bottom-7',
        show ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      )}
    >
      <svg viewBox="0 0 40 24" className="h-[1.5rem] w-[2.5rem] [filter:drop-shadow(0_0_3px_rgb(255_255_255/0.55))]" aria-hidden="true">
        <path d="M4.4 18 L20 6 L35.6 18" fill="none" stroke="var(--color-espresso-800)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
