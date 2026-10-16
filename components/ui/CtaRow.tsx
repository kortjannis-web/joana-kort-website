import { ArrowRight } from 'lucide-react'
import { ButtonLink } from './Button'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Wiederkehrender CTA (etwa alle drei Elemente): immer dasselbe Ziel, das kostenlose 15-Minuten-Gespräch mit kurzem Fragebogen.
 * Orange ist auf der Website den CTAs vorbehalten. `tone="dark"` auf Espresso-Flächen.
 */
export function CtaRow({
  className,
  align = 'start',
  tone = 'light',
  href = ERSTGESPRAECH,
  label = CTA_LABEL,
  note = '15 Minuten · kostenlos · unverbindlich',
}: {
  className?: string
  align?: 'start' | 'center'
  tone?: 'light' | 'dark'
  href?: string
  label?: string
  note?: string | null
}) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5', align === 'center' && 'sm:justify-center', className)}>
      <ButtonLink href={href} variant="primary" size="lg" className="group w-full sm:w-auto">
        {label}
        <ArrowRight className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 ease-[var(--ease-lift)] group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
      </ButtonLink>
      {note && <p className={cn('text-center text-[0.875rem] sm:text-left', tone === 'dark' ? 'text-espresso-200' : 'text-muted')}>{note}</p>}
    </div>
  )
}
