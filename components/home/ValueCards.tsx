'use client'

import { useEffect, useRef, useState } from 'react'
import { FlaskConical, Footprints, Fingerprint } from 'lucide-react'
import { Carousel } from '@/components/ui/Carousel'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { cn } from '@/lib/utils'

export const WERTE = [
  { title: 'Individuell', text: 'Ihr Leben bestimmt den Plan, nicht umgekehrt.', Icon: Fingerprint },
  { title: 'Praktisch', text: 'Kleine Schritte, die im Alltag halten.', Icon: Footprints },
  { title: 'Fundiert', text: 'Wissen aus der Gesundheitspsychologie.', Icon: FlaskConical },
]

function ValueCard({ title, text, Icon, row = false }: (typeof WERTE)[number] & { row?: boolean }) {
  return (
    <div
      className={cn(
        'group relative flex h-full gap-4 rounded-lg border border-white/12 bg-white/[0.06] px-4 py-[clamp(0.625rem,1.6svh,1.25rem)] transition-[transform,border-color,background-color] duration-700 ease-[var(--ease-soft)]',
        'group-data-[active=true]/v:scale-[1.03] group-data-[active=true]/v:border-caramel-300/45 group-data-[active=true]/v:bg-white/[0.09]',
        row ? 'items-center' : 'flex-col gap-3 md:max-xl:flex-row md:max-xl:items-center md:max-xl:gap-4'
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center">
        <span className="glow-icon">
          <Icon className="h-6 w-6 text-caramel-300" strokeWidth={1.6} aria-hidden="true" />
        </span>
      </span>
      <div>
        <p className="font-semibold text-white transition-colors duration-500 group-data-[active=true]/v:text-caramel-200">{title}</p>
        <p className="mt-1 text-[0.875rem] leading-snug text-espresso-200 compact:hidden lowtab:hidden">{text}</p>
      </div>
    </div>
  )
}

/** Drei Werte auf Espresso (ab Tablet): im Loop (1,8 s) leuchtet je einer auf, Symbol mit hellem Kern, Hover hält fest */
export function ValueCards() {
  const { ref, bind } = useSpotlight<HTMLDivElement>(WERTE.length, 1800)
  return (
    <div ref={ref} className="mt-[clamp(1.25rem,4svh,2.5rem)] grid gap-3 xl:grid-cols-3">
      {WERTE.map((w, i) => (
        <div key={w.title} {...bind(i)} className="group/v">
          <ValueCard {...w} />
        </div>
      ))}
    </div>
  )
}

/** Handy: die drei Werte untereinander, gesteuert von ValueCarousel (nur der aktive leuchtet). Tippen wählt aus */
function ValueStack({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <div className="flex h-full flex-col gap-2">
      {WERTE.map((w, i) => (
        <div key={w.title} data-active={active === i} onClick={() => onPick(i)} className="group/v">
          <ValueCard {...w} row />
        </div>
      ))}
    </div>
  )
}

const STEP_MS = 2000
const QUOTE_MS = 5000

/**
 * Handy: zwei Seiten zum Wischen. Erst die drei Werte untereinander (je 2 s hervorgehoben), nach "Fundiert" gleitet die Reihe
 * selbst zum Zitat von Joana, zeigt es 5 s und gleitet zurück, dann beginnt es wieder bei "Individuell" (Loop).
 * Jeder Seitenwechsel (auch selbst gewischt) startet den Zeitgeber neu: zurück bei den Werten immer ab "Individuell",
 * beim Zitat wieder volle 5 s. Läuft nur im Viewport, bei "Bewegung reduzieren" kein Auto-Wechsel.
 * Breite Karten und großer Abstand: das Zitat schaut auf der ersten Seite nicht schon herein.
 */
export function ValueCarousel({ quote }: { quote: React.ReactNode }) {
  const api = useRef<{ to: (i: number) => void } | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(false)
  // Neustart nach Tippen auf einen Wert
  const [restart, setRestart] = useState(0)

  useEffect(() => {
    const el = box.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Seitenwechsel: Werte beginnen immer bei "Individuell"
  useEffect(() => {
    if (page === 0) setStep(0)
  }, [page])

  useEffect(() => {
    if (!run) return
    if (page === 1) {
      const t = setTimeout(() => api.current?.to(0), QUOTE_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => (step < WERTE.length - 1 ? setStep(step + 1) : api.current?.to(1)), STEP_MS)
    return () => clearTimeout(t)
  }, [run, page, step, restart])

  return (
    <div ref={box}>
      <Carousel label="Meine Werte" arrowLabel="Werte" item="88vw" tone="dark" className="[&_ul]:gap-14" api={api} onActiveChange={setPage}>
        {[
          <ValueStack
            key="werte"
            active={step}
            onPick={(i) => {
              setStep(i)
              setRestart((r) => r + 1)
            }}
          />,
          <div key="zitat" className="flex h-full min-h-[14rem] flex-col justify-center px-1">
            {quote}
          </div>,
        ]}
      </Carousel>
    </div>
  )
}
