import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * "Mehr erfahren" per Pfeil: Der Langtext steht vollständig im HTML (Google und KI-Suchen lesen ihn), sichtbar wird er erst nach dem Klick.
 * Kein Anschnitt, kein Verlauf, keine Vorschau. Ohne JavaScript funktionsfähig (<details>).
 * `label`: kurzer Text neben dem Pfeil (Screenreader bekommen ihn immer), `tone`: Pfeil auf hellem oder dunklem Grund.
 */
export function More({
  children,
  label = 'Mehr erfahren',
  showLabel = false,
  tone = 'light',
  align = 'start',
  className,
  bodyClassName,
}: {
  children: ReactNode
  label?: string
  showLabel?: boolean
  tone?: 'light' | 'dark'
  align?: 'start' | 'center'
  className?: string
  bodyClassName?: string
}) {
  const dark = tone === 'dark'
  return (
    <details className={cn('more group', className)}>
      <summary className={cn('inline-flex min-h-11 items-center gap-2.5 rounded-md outline-none', align === 'center' && 'mx-auto flex w-fit')}>
        <span
          className={cn(
            'more-arrow grid h-10 w-10 place-items-center rounded-md border',
            dark ? 'border-white/25 text-caramel-200 group-hover:border-caramel-300 group-hover:bg-white/[0.06]' : 'border-[#ddd3c6] bg-white text-espresso-800 group-hover:border-caramel-500'
          )}
        >
          <ChevronDown className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className={cn(showLabel ? 'text-[0.875rem] font-semibold' : 'sr-only', dark ? 'text-espresso-200' : 'text-muted')}>{label}</span>
      </summary>
      <div className={cn('more-body pt-3', bodyClassName)}>{children}</div>
    </details>
  )
}
