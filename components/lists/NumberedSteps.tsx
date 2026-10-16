'use client'

import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { cn } from '@/lib/utils'

type Item = { title: string; text: string }

/**
 * Nummerierter Ablauf (Kreis mit kursiver Ziffer). Der Kreis hebt sich im Loop an (lift-tile, useSpotlight).
 * rows: Zeilen mit Trennlinien auf allen Breakpoints · cards: mobil Zeilen, ab Tablet drei Karten nebeneinander.
 */
export function NumberedSteps({
  items,
  variant = 'rows',
  className,
}: {
  items: Item[]
  variant?: 'rows' | 'cards'
  className?: string
}) {
  const { ref, bind } = useSpotlight<HTMLOListElement>(items.length)
  const cards = variant === 'cards'
  return (
    <ol ref={ref} className={cn('border-t border-line', cards && 'md:grid md:grid-cols-3 md:gap-5 md:border-0 xl:gap-6', className)}>
      {items.map((s, i) => (
        <li key={s.title} {...bind(i)} className={cn('lift-hover', cards && 'md:flex')}>
          <Reveal
            delay={i * 0.08}
            className={cn(
              'flex gap-4 border-b border-line py-[1.125rem] xl:gap-[1.125rem] xl:py-[1.375rem]',
              cards && 'md:w-full md:flex-col md:gap-3.5 md:rounded-lg md:border md:bg-white md:p-7 md:floaty xl:p-[1.875rem]'
            )}
          >
            <span
              aria-hidden="true"
              className="lift-tile grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terra-50 font-serif text-[1.25rem] italic text-terra-600 xl:h-12 xl:w-12 xl:text-[1.375rem]"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-[1.0625rem] font-semibold leading-snug text-espresso-900 xl:text-[1.1875rem]">{s.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
