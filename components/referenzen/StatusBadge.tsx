import { cn } from '@/lib/utils'

/**
 * Status einer Qualifikation. Laufendes MUSS sichtbar als "Laufend" gekennzeichnet sein (Transparenz, keine Titel vor dem Abschluss).
 * Kantiges Badge, der Punkt davor darf rund bleiben.
 */
export function StatusBadge({ status, className }: { status: 'abgeschlossen' | 'laufend'; className?: string }) {
  const laufend = status === 'laufend'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em]',
        laufend ? 'border-caramel-500/60 bg-caramel-50 text-caramel-800' : 'border-line bg-white text-espresso-800',
        className
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', laufend ? 'bg-caramel-500' : 'bg-espresso-800')} />
      {laufend ? 'Laufend' : 'Abgeschlossen'}
    </span>
  )
}
