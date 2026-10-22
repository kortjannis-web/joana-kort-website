import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { cn } from '@/lib/utils'

/**
 * Sheet: helle Fläche direkt nach dem Hero (PageHero) mit dem GESAMTEN restlichen Seiteninhalt.
 * Keine Überlappung, nur ein weicher Schatten nach oben (data-sheet: Header und Kontakt-Knöpfe messen daran das Hero-Ende).
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
      {crumbs && (
        <div className="wrap pt-9 md:pt-12">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      {children}
    </div>
  )
}
