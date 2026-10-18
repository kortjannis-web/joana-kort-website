import Link from 'next/link'
import { ChevronRight, MonitorSmartphone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { PortraitFrame } from './PortraitFrame'
import { AreaMap } from './AreaMap'
import { ORTE, ROLE, site } from '@/lib/site'

/**
 * Über mich (Teaser) und Region.
 * Über mich: Bogen links (Foto, sobald vorhanden), Text rechts. Region: weiße Karte, links der Umkreis um Gummersbach (AreaMap), rechts Orte.
 */
export function AboutArea() {
  return (
    <>
      <section aria-labelledby="ueber-title" className="sec bg-stone xl:flex xl:min-h-svh xl:items-center">
        <div className="wrap w-full">
          <div className="grid gap-[clamp(1rem,2.5svh,1.5rem)] md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-0 xl:mx-auto xl:max-w-[70rem] xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] xl:gap-x-20">
            <Reveal className="md:col-start-2 md:row-start-1">
              <p className="t-label text-caramel-700">Über mich</p>
              <h2 id="ueber-title" className="t-h2 mt-3 text-espresso-900">
                Ich bin Joana Kort und kenne Stress nicht nur aus dem <em className="italic text-caramel-600">Lehrbuch</em>
              </h2>
            </Reveal>
            <PortraitFrame
              fill
              className="mx-auto h-[26svh] min-h-[10rem] w-[min(62%,calc(26svh*0.85))] compact:h-[21svh] compact:w-[calc(21svh*0.85)] md:col-start-1 md:row-span-2 md:row-start-1 md:h-[min(100%,calc(100svh-2*var(--sec-y)))] md:min-h-[22rem] md:w-full md:max-w-[calc((100svh-2*var(--sec-y))*0.8)]"
            />
            <Reveal delay={0.1} className="md:col-start-2 md:row-start-2">
              <div className="t-lead space-y-3 max-md:text-[0.9375rem] max-md:leading-relaxed md:mt-[clamp(1rem,2.5svh,1.5rem)] md:space-y-4">
                <p className="text-ink/85">
                  Über viele Jahre hörte ich von Ärzten, dass Stress eine Rolle spielt. Wie ich ihn konkret verstehe und abbaue, hat mir niemand
                  gezeigt. Heute verbinde ich mein Studium der Gesundheitspsychologie mit dem, was ich selbst als Mutter und Studentin im Alltag
                  ausprobiert und umgesetzt habe.
                </p>
                <p className="text-muted">
                  Ich begegne Ihnen auf Augenhöhe, denke strukturiert und gern in Lösungen und nehme Ihre Situation ernst. {ROLE.short}.
                </p>
              </div>
              <ButtonLink href="/joana-kort/" variant="dark" className="mt-[clamp(1rem,2.5svh,2rem)] w-full sm:w-auto">
                Mehr über mich
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="region-title" className="sec xl:flex xl:min-h-svh xl:items-center">
        <div className="wrap w-full">
          <Reveal className="floaty grid gap-2 rounded-xl border border-line bg-white p-2 md:grid-cols-2 xl:mx-auto xl:max-w-[72rem] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative h-[21svh] min-h-[9rem] overflow-hidden rounded-lg bg-espresso-800 md:h-auto md:min-h-[min(24rem,calc(100svh-2*var(--sec-y)-1rem))]">
              <AreaMap />
            </div>
            <div className="flex flex-col justify-center p-4 pb-2 md:p-[clamp(1.5rem,4svh,3rem)] xl:px-12">
              <h2 id="region-title" className="font-serif text-[clamp(1.5rem,min(1.3rem+1.35vw,0.8rem+2.6svh),2.5rem)] leading-[1.12] tracking-[-0.015em] text-espresso-900">
                Stressberatung in {site.address.city} und online
              </h2>
              <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[0.9375rem] leading-relaxed text-muted md:text-base">
                Vor Ort bin ich im Umkreis von etwa {site.radiusKm} Kilometern um {site.address.city} für Sie da, im Oberbergischen und angrenzend.
                Für Vor-Ort-Termine berechne ich Fahrtkosten. Online begleite ich Sie per Video, ganz gleich, wo Sie wohnen.
              </p>
              <ul className="mt-[clamp(0.75rem,2svh,1.5rem)] grid grid-cols-2 gap-x-6 border-t border-line compact:hidden max-md:grid-cols-3 max-md:gap-x-3">
                {ORTE.map((o) => (
                  <li key={o.name} className="flex min-h-[clamp(2.25rem,5svh,2.75rem)] items-center gap-2 border-b border-line text-[0.8125rem] text-espresso-900 md:text-[0.9375rem]">
                    {o.name}
                  </li>
                ))}
              </ul>
              <div className="mt-[clamp(0.5rem,2svh,1.5rem)] flex flex-wrap gap-x-6">
                <Link href="/stressberatung-gummersbach/" className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-espresso-800 hover:text-caramel-800">
                  Vor Ort in {site.address.city}
                  <ChevronRight className="h-4 w-4 text-caramel-600 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                </Link>
                <Link href="/stressberatung-online/" className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-espresso-800 hover:text-caramel-800">
                  <MonitorSmartphone className="h-4 w-4 text-caramel-600" strokeWidth={1.75} aria-hidden="true" />
                  Online per Video
                  <ChevronRight className="h-4 w-4 text-caramel-600 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
