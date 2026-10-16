'use client'

import Link from 'next/link'
import { Feather, Fingerprint, FlaskConical, Sprout } from 'lucide-react'
import { PaperStack } from '@/components/ui/PaperStack'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'

const PRINZIPIEN = [
  { title: 'Klein anfangen', text: 'Eine Veränderung, die bleibt, entlastet mehr als zehn gute Vorsätze.', Icon: Sprout },
  { title: 'Minimum statt perfekt', text: 'Für schwere Tage gibt es ein Minimum. Was ausfällt, wird nicht nachgeholt.', Icon: Feather },
  { title: 'Für Ihr Leben gemacht', text: 'Methoden und Pläne richten sich nach Ihnen, nicht umgekehrt.', Icon: Fingerprint },
  { title: 'Fundiert und praktisch', text: 'Wissen aus der Gesundheitspsychologie, übersetzt in Ihren Alltag.', Icon: FlaskConical },
]

const WERKZEUGE = ['Stresstagebuch', 'Stresslandkarte', 'Begleitungsplan', 'Tagesplaner', 'Wochenfokus', 'Haushalts- und Essenspläne']

/**
 * Prinzipien und Werkzeuge: links Joanas echte Materialien als Papierstapel (fächern sich beim Hover auf),
 * rechts vier Prinzipien im Loop (lift-tile) und die Werkzeuge als Chips. Zeigt konkret, wie die Arbeit aussieht.
 */
export function Tools() {
  const { ref, bind } = useSpotlight<HTMLUListElement>(PRINZIPIEN.length, 3200)
  return (
    <section aria-labelledby="werkzeuge-title" className="overflow-hidden py-16 md:py-24 xl:py-28">
      <div className="wrap grid items-center gap-12 xl:grid-cols-12 xl:gap-16">
        <Reveal className="mx-auto w-full max-w-[36rem] xl:col-span-6 xl:max-w-none">
          <PaperStack layout="tagebuch" />
          <p className="mt-6 text-center text-[0.875rem] italic text-muted">Aus der Praxis: mein Stresstagebuch für vier Wochen</p>
        </Reveal>

        <div className="xl:col-span-6">
          <Reveal>
            <p className="t-label text-caramel-700">Prinzipien und Werkzeuge</p>
            <h2 id="werkzeuge-title" className="t-h2 mt-3 text-espresso-900">
              Werkzeuge, die in Ihren <em className="italic text-caramel-600">Alltag</em> passen
            </h2>
            <p className="t-lead mt-4 text-muted">
              Sie bekommen keine weitere To-do-Liste, sondern Materialien und Pläne, die Ihnen Arbeit abnehmen. Auf Wunsch erstelle ich sie
              nach Ihren Angaben für Sie.
            </p>
          </Reveal>
          <ul ref={ref} className="mt-7 grid gap-x-6 sm:grid-cols-2">
            {PRINZIPIEN.map(({ title, text, Icon }, i) => (
              <Reveal as="li" key={title} delay={0.06 * i}>
                <div {...bind(i)} className="lift-hover flex gap-4 border-t border-line py-4">
                  <span className="lift-tile grid h-10 w-10 shrink-0 place-items-center rounded-[0.625rem] bg-stone text-espresso-800">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-espresso-900">{title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Werkzeuge in der Begleitung">
              {WERKZEUGE.map((w) => (
                <li key={w} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.875rem] text-espresso-800">
                  {w}
                </li>
              ))}
            </ul>
            <Link href="/stresscoaching/#materialien" className="link mt-6 inline-flex font-semibold">
              So sehen die Materialien aus
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
