'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Bewertungstext eingeklappt: vier Zeilen lesbar, die fünfte läuft weich ins Weiß der Karte aus. Der Pfeil darunter klappt den ganzen Text auf.
 * Kurze Texte (passen ganz hinein) bekommen weder Verlauf noch Pfeil. Ohne JS: eingeklappt mit Pfeil (Annahme: lang).
 */
export function ReviewText({ text, id }: { text: string; id: string }) {
  const [open, setOpen] = useState(false)
  const [long, setLong] = useState(true)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || open) return
    const check = () => setLong(el.scrollHeight > el.clientHeight + 2)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  return (
    <>
      <blockquote className="mt-4 text-base leading-[1.65] text-ink/90">
        <p
          ref={ref}
          id={id}
          className={cn(
            !open && 'max-h-[calc(1.65em*5)] overflow-hidden',
            !open && long && '[mask-image:linear-gradient(180deg,#000_calc(100%-2.6em),transparent)]'
          )}
        >
          „{text}“
        </p>
      </blockquote>
      {long && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={open ? 'Bewertung einklappen' : 'Ganze Bewertung lesen'}
          onClick={() => setOpen((v) => !v)}
          className="group mx-auto -mb-1 -mt-1.5 grid h-11 w-11 place-items-center rounded-full text-espresso-800 transition-colors duration-300 hover:bg-espresso-800/[0.06]"
        >
          <ChevronDown
            className={cn('h-5 w-5 transition-transform duration-500 ease-[var(--ease-soft)]', open && 'rotate-180')}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>
      )}
    </>
  )
}
