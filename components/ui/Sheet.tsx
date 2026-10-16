import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { cn } from '@/lib/utils'

/**
 * Sheet: helle Fläche mit runden oberen Ecken und Griff-Streifen. Folgt direkt auf einen Bild-Hero (PageHero)
 * und nimmt den GESAMTEN restlichen Seiteninhalt auf, damit sich alles über den stehenden Hero schiebt.
 * Optional Brotkrumen oben (wie im Design).
 */
export function Sheet({
  children,
  crumbs,
  className,
  bg = 'bg-paper',
}: {
  children: ReactNode
  crumbs?: Crumb[]
  className?: string
  bg?: string
}) {
  return (
    <div data-sheet className={cn('sheet', bg, className)}>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2.5 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-[#8c7c6e]/45 md:top-3.5 md:h-[5px] md:w-12"
      />
      {crumbs && (
        <div className="wrap pt-9 md:pt-12">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      {children}
    </div>
  )
}
