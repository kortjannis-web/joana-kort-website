'use client'

import { BatteryLow, ListChecks, Waves } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { useSpotlight } from '@/components/ui/useSpotlight'

/** Drei Fragen aus dem Briefing, in denen sich die Zielgruppe wiedererkennt */
const fragen = [
  { text: 'Haben Sie das Gefühl, dass Ihnen alles über den Kopf wächst?', Icon: Waves },
  { text: 'Wissen Sie eigentlich, was helfen könnte, und schaffen es trotzdem nicht im Alltag?', Icon: ListChecks },
  { text: 'Fehlen Ihnen Zeit und Energie, sich auch noch um Ihren Stress zu kümmern?', Icon: BatteryLow },
]

/** Im Loop (3,5 s) hebt sich ein Symbol an (lift-tile), Hover/Tippen hebt genau dieses an */
export function SorgenList() {
  const { ref, bind } = useSpotlight<HTMLUListElement>(fragen.length, 3500)
  return (
    <ul ref={ref} className="border-t border-line">
      {fragen.map(({ text, Icon }, i) => (
        <Reveal as="li" key={i} delay={0.08 + i * 0.06}>
          <div {...bind(i)} className="lift-hover group flex items-center gap-4 border-b border-line py-[clamp(0.5rem,1.4svh,0.875rem)] md:gap-5">
            <span className="lift-tile grid h-10 w-10 shrink-0 place-items-center rounded-[0.625rem] bg-stone text-espresso-800">
              <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="text-[0.9375rem] leading-snug text-ink/80 transition-colors duration-500 group-data-[active=true]:text-ink md:text-[1.0625rem]">{text}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
