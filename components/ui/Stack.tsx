import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Früher Stapel-Effekt (stehendes Element, das nächste schob sich darüber). Entscheidung 22.10.2026: keine Überlappungen mehr,
 * jede Fläche ist eine normale neue Section. Bleibt als einfacher Rahmen bestehen (Hero, <main>, Startseite "Lösung"),
 * die folgende Fläche (.sheet) wirft nur noch einen Schatten nach oben.
 */
export function StackBack({
  children,
  className,
  as: Tag = 'div',
  id,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'main' | 'section'
  /** Ohne Wirkung (früher Abdunklung beim Überdecken) */
  shade?: number
  id?: string
}) {
  return (
    <Tag id={id} className={cn('relative isolate overflow-clip', className)}>
      {children}
    </Tag>
  )
}
