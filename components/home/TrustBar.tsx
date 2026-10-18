'use client'

import { useEffect, useRef, useState } from 'react'
import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'
import { site } from '@/lib/site'
import { TrustScene, type TrustSceneId } from './TrustScene'

type Item = { title: string; text: string; scene: TrustSceneId }

const items: Item[] = [
  { title: 'Fachlich fundiert', text: 'Gesundheitspsychologie, verständlich übersetzt', scene: 'studium' },
  { title: 'Individuell statt Schema F', text: 'Methoden, die zu Ihrem Alltag passen', scene: 'individuell' },
  { title: 'Online und vor Ort', text: `Per Video oder rund um ${site.address.city}`, scene: 'ort' },
]

function Card({ title, text, scene, run, leaving }: Item & { run?: boolean; leaving?: boolean }) {
  return (
    <div className="lift-hover floaty flex h-full flex-col rounded-lg border border-line bg-white p-5 pb-7 max-md:py-6 max-md:pb-8 xl:p-6 xl:pb-8">
      {/* Kachel mit Motion-Design (3 s, wenn die Karte im Loop aktiv ist), hebt sich dabei hell-orange an */}
      <span className="lift-warm grid h-20 w-20 place-items-center overflow-hidden rounded-[1.125rem] bg-stone text-caramel-700 [transition-delay:var(--lift-delay,0s)]">
        <TrustScene id={scene} run={run} leaving={leaving} />
      </span>
      <p className="mt-4 font-serif max-md:mt-5 text-[1.15rem] font-medium leading-snug text-espresso-900 md:text-[1.25rem]">{title}</p>
      <p className="mt-1 text-[0.9375rem] leading-snug text-muted">{text}</p>
    </div>
  )
}

/**
 * Vertrauensleiste, erster Block im Sheet über dem Hero (Konzept Stufe 1).
 * Desktop: vier Karten, alle 3 s ist die nächste aktiv: ihre Kachel hebt sich an (hell-orange, Schatten) und zeigt ein 3-s-Motion-Design (TrustScene).
 * Maus darauf hält sie fest, danach läuft der Loop ab dieser Karte weiter. Animationen starten erst, wenn die Leiste im Bild ist (data-inview).
 * Handy/Tablet: Karussell, alle 3 s zügig zur nächsten Karte (Loop, auch wischbar), die Kachel hebt sich nach dem Einrasten an.
 */
export function TrustBar() {
  const section = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  // Takt (3 s) beginnt erst, wenn die Leiste im Bild ist: die erste Szene läuft zuerst, beim Verlassen springt alles zurück auf Karte 1
  const { ref, active, bind } = useSpotlight<HTMLUListElement>(items.length, 3000, inView)
  // Szenen nur mit JS und ohne "Bewegung reduzieren" (sonst steht das fertige Bild)
  const [anim, setAnim] = useState(false)
  const [mActive, setMActive] = useState(0)
  useEffect(() => {
    setAnim(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const desk = useRun(anim && inView, active)
  const mob = useRun(anim && inView, mActive)
  return (
    <section ref={section} data-inview={inView} data-anim={anim ? 'on' : undefined} aria-label="Was Sie bei mir erwartet" className="pb-14 pt-10 md:pb-16 md:pt-12 xl:pb-20 xl:pt-8">
      <Reveal className="wrap">
        <div className="xl:hidden">
          <Carousel
            label="Was Sie bei mir erwartet"
            arrowLabel="Vorteile"
            autoplay={3000}
            playing={inView}
            item="66vw"
            itemMd="calc((100% - 2.5rem) / 3)"
            itemClassName="[--lift-delay:0.15s]"
            onActiveChange={setMActive}
          >
            {items.map((it, i) => (
              <Card key={it.title} {...it} {...mob(i)} />
            ))}
          </Carousel>
        </div>
        <ul ref={ref} className="hidden grid-cols-3 gap-6 xl:grid">
          {items.map((it, i) => (
            <li key={it.title} {...bind(i)}>
              <Card {...it} {...desk(i)} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

/** Je Karte: läuft die Szene (aktiv oder blendet gerade aus) und blendet sie aus (bis 450 ms nach dem Wechsel, dann zurück auf leer) */
function useRun(on: boolean, active: number) {
  const prev = useRef(active)
  const [leaving, setLeaving] = useState<number | null>(null)
  useEffect(() => {
    if (prev.current === active) return
    const p = prev.current
    prev.current = active
    setLeaving(p)
    const t = setTimeout(() => setLeaving((l) => (l === p ? null : l)), 450)
    return () => clearTimeout(t)
  }, [active])
  return (i: number) => ({ run: on && (i === active || i === leaving), leaving: on && i === leaving && i !== active })
}
