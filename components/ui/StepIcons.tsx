import { cn } from '@/lib/utils'

/**
 * Eigene Linien-Icons für die drei Schritte (Briefing Ä6: fein, zurückhaltend, keine Emojis).
 * 1 Verstehen: Kopf im Profil, darin die Markenlinie mit Knoten · 2 Bewältigen: offene Hand · 3 Managen: Plan mit Haken.
 * pathLength=1: zeichnen sich in `.step-icons[data-view]` (globals.css), ohne JS fertig.
 */
const PATHS: Record<1 | 2 | 3, string[]> = {
  1: [
    'M16 44V36C10 33 8 27 8 22C8 12.6 15.6 6 25 6C33.8 6 40 12 40 20L43 27C43.5 28 42.8 29 41.8 29H40V34C40 36.2 38.2 38 36 38H31V44',
    'M14 22C17.5 22 18.5 15 22.5 15C26.5 15 26.6 21.2 23.6 21.6C20.6 22 21 14.4 26.6 14.4C31 14.4 30.6 22 34.5 22',
  ],
  2: [
    'M18 31V11a2.5 2.5 0 0 1 5 0V22V8.5a2.5 2.5 0 0 1 5 0V22V10.5a2.5 2.5 0 0 1 5 0V24V15a2.5 2.5 0 0 1 5 0V29C38 37 33 43 26 43H24.5C20 43 17 41 14.5 37.5L9.6 30.4a2.6 2.6 0 0 1 4.3-3L18 31',
  ],
  3: ['M10 10H38A2 2 0 0 1 40 12V40A2 2 0 0 1 38 42H10A2 2 0 0 1 8 40V12A2 2 0 0 1 10 10Z', 'M8 18H40', 'M16 6V13M32 6V13', 'M14 26.5L16.5 29L21 24.5M25 27H34', 'M14 34.5L16.5 37L21 32.5M25 35H34'],
}

export function StepIcon({ nr, className, strokeWidth = 1.5 }: { nr: 1 | 2 | 3; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn('step-icon', className)}>
      {PATHS[nr].map((d, i) => (
        <path key={i} d={d} pathLength={1} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ '--i': i } as React.CSSProperties} />
      ))}
    </svg>
  )
}
