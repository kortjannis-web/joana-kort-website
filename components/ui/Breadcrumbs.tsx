import Link from 'next/link'
import { JsonLd } from './JsonLd'
import { breadcrumbSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'

export type Crumb = { name: string; path: string }

/** Sichtbare Brotkrumen + BreadcrumbList-Schema (gleiche Daten) */
export function Breadcrumbs({ items, tone = 'dark', className }: { items: Crumb[]; tone?: 'dark' | 'light'; className?: string }) {
  const all = [{ name: 'Startseite', path: '/' }, ...items]
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Brotkrumen" className={cn('text-[0.8125rem]', className)}>
        <ol className={cn('flex flex-wrap items-center gap-x-2 gap-y-1', tone === 'dark' ? 'text-muted' : 'text-white/70')}>
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className={tone === 'dark' ? 'text-caramel-500' : 'text-caramel-300'}>
                  /
                </span>
              )}
              {i < all.length - 1 ? (
                <Link href={c.path} className={cn('underline-offset-[0.2em] transition-colors duration-500 ease-[var(--ease-soft)] hover:underline', tone === 'dark' ? 'hover:text-espresso-800' : 'hover:text-white')}>
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className={tone === 'dark' ? 'text-ink' : 'text-white'}>
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
