'use client'

import { Check } from 'lucide-react'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { cn } from '@/lib/utils'

/** Liste mit Haken (Terrakotta-Häkchen). Die Häkchen leuchten nacheinander auf (glow-icon, useSpotlight). */
export function CheckList({ items, className, itemClassName }: { items: string[]; className?: string; itemClassName?: string }) {
  const { ref, bind } = useSpotlight<HTMLUListElement>(items.length)
  return (
    <ul ref={ref} className={cn('space-y-3', className)}>
      {items.map((t, i) => (
        <li key={t} {...bind(i)} className={cn('glow-hover flex items-start gap-3 leading-[1.55]', itemClassName)}>
          <span className="glow-icon mt-[0.2em] shrink-0 text-caramel-500" aria-hidden="true">
            <Check className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}
