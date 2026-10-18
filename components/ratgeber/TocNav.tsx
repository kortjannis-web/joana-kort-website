'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Inhaltsverzeichnis eines Artikels als Kapitel-Knöpfe. Handy/Tablet: umbrechende Reihe, Desktop: links mitlaufende Liste.
 * Das Kapitel, in dem man gerade liest, ist hervorgehoben (aria-current). Ohne JS: normale Ankerlinks.
 */
export function TocNav({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = items.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    // Aktiv ist die letzte Überschrift, die das obere Drittel des Bildschirms schon passiert hat
    const update = () => {
      const line = window.innerHeight * 0.33
      let cur: string | null = null
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id
      setActive(cur)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [items])

  return (
    <ol className="mt-3 flex flex-wrap gap-2 xl:mt-4 xl:flex-col xl:flex-nowrap">
      {items.map((h) => {
        const on = active === h.id
        return (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={on ? 'location' : undefined}
              className={cn(
                'flex min-h-11 items-center rounded-md border px-3.5 py-2 text-[0.9375rem] font-medium leading-snug transition-colors duration-300 ease-[var(--ease-soft)] xl:px-4',
                on
                  ? 'border-espresso-800 bg-espresso-800 text-white'
                  : 'border-line bg-white text-espresso-900 hover:border-caramel-400 hover:text-bordeaux'
              )}
            >
              {h.text}
            </a>
          </li>
        )
      })}
    </ol>
  )
}
