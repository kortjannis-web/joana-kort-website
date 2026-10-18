'use client'

import Link from 'next/link'
import { Feather, FlaskConical, Sprout } from 'lucide-react'
import { Carousel } from '@/components/ui/Carousel'
import { PaperStack } from '@/components/ui/PaperStack'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'

const PRINZIPIEN = [
  { title: 'Klein anfangen', text: 'Eine Veränderung, die bleibt, entlastet mehr als zehn gute Vorsätze.', Icon: Sprout },
  { title: 'Minimum statt perfekt', text: 'Für schwere Tage gibt es ein Minimum. Was ausfällt, wird nicht nachgeholt.', Icon: Feather },
  { title: 'Fundiert und praktisch', text: 'Wissen aus der Gesundheitspsychologie, übersetzt in Ihren Alltag.', Icon: FlaskConical },
]

const WERKZEUGE = ['Stresstagebuch', 'Stresslandkarte', 'Unterstützungsplan']

function Prinzip({ title, text, Icon }: (typeof PRINZIPIEN)[number]) {
  return (
    <>
      <span className="lift-tile grid h-10 w-10 shrink-0 place-items-center rounded-[0.625rem] bg-stone text-espresso-800">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span>
        <span className="block font-semibold text-espresso-900">{title}</span>
        <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{text}</span>
      </span>
    </>
  )
}

/**
 * Prinzipien und Werkzeuge: Joanas echte Materialien als Papierstapel (fächern sich beim Hover auf),
 * daneben drei Prinzipien im Loop (lift-tile) und die Werkzeuge als Chips. Zeigt konkret, wie die Arbeit aussieht.
 * Handy/Tablet: Titel, Stapel (Höhe am Viewport bemessen), Prinzipien wischbar. Ab 1024: Stapel links, Text rechts.
 */
export function Tools() {
  const { ref, bind } = useSpotlight<HTMLUListElement>(PRINZIPIEN.length, 3200)
  return (
    <section aria-labelledby="werkzeuge-title" className="sec overflow-hidden xl:flex xl:min-h-svh xl:items-center">
      <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-12 xl:gap-x-16">
        <Reveal className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end">
          <p className="t-label text-caramel-700">Prinzipien und Werkzeuge</p>
          <h2 id="werkzeuge-title" className="t-h2 mt-3 text-espresso-900">
            Werkzeuge, die in Ihren <em className="italic text-caramel-600">Alltag</em> passen
          </h2>
          <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-muted max-md:text-[0.9375rem] max-md:leading-relaxed">
            Sie bekommen keine weitere To-do-Liste, sondern Materialien und Pläne, die Ihnen Arbeit abnehmen. Auf Wunsch erstelle ich sie
            nach Ihren Angaben für Sie.
          </p>
        </Reveal>

        <Reveal className="mx-auto w-full max-w-[min(36rem,calc(23svh*1.25))] md:max-w-[min(36rem,calc(32svh*1.25))] lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[min(100%,calc((100svh-2*var(--sec-y)-5rem)*1.25))] lg:self-center">
          <PaperStack layout="tagebuch" />
          <p className="mt-[clamp(0.5rem,2svh,1.5rem)] text-center text-[0.875rem] italic text-muted max-md:hidden">
            Aus der Praxis: mein Stresstagebuch für vier Wochen
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start">
          <div className="lg:hidden">
            <Carousel label="Prinzipien" arrowLabel="Prinzipien" item="80vw" itemMd="calc((100% - 2.5rem) / 3)" itemClassName="lift-hover">
              {PRINZIPIEN.map((p) => (
                <div key={p.title} className="flex h-full gap-4 rounded-lg border border-line bg-white p-4">
                  <Prinzip {...p} />
                </div>
              ))}
            </Carousel>
          </div>
          <ul ref={ref} className="hidden lg:block">
            {PRINZIPIEN.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.06 * i}>
                <div {...bind(i)} className="lift-hover flex gap-4 border-t border-line py-[clamp(0.625rem,1.8svh,1rem)]">
                  <Prinzip {...p} />
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 lg:mt-[clamp(0.5rem,1.5svh,1rem)] lg:block">
            <ul className="hidden flex-wrap gap-2 xl:flex lowdesk:hidden" aria-label="Werkzeuge in der Begleitung">
              {WERKZEUGE.map((w) => (
                <li key={w} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.875rem] text-espresso-800">
                  {w}
                </li>
              ))}
            </ul>
            <Link href="/stresscoaching/#materialien" className="link inline-flex min-h-11 items-center font-semibold lg:mt-[clamp(0.5rem,2svh,1.5rem)]">
              So sehen die Materialien aus
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
