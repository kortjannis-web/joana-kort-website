import Link from 'next/link'
import { GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import { ErstgespraechFunnel } from '@/components/funnel/ErstgespraechFunnel'
import { HeroLine } from '@/components/ui/HeroLine'
import { StackBack } from '@/components/ui/Stack'
import { site } from '@/lib/site'

/** Drei Vertrauenspunkte unter dem Text (3er-Gruppe) */
const PUNKTE = [
  { text: 'Wissenschaftlich fundiert', Icon: GraduationCap },
  { text: 'Persönlich und vertraulich', Icon: ShieldCheck },
  { text: `${site.address.city} und online`, Icon: MapPin },
]

/**
 * Startseite Stufe 1 (Aufbau wie Vorlage, hell): Vollbild-Hero bleibt stehen, das Sheet schiebt sich darüber.
 * Beige Papierfläche mit Körnung, weichem Licht und der Markenlinie, die sich beim Laden zeichnet.
 * Intro (CSS, globals.css): Logo, dann nacheinander Zeile, Titelzeile 1, 2, 3, Text, Link, Vertrauenspunkte, Karte, Header.
 * Kein CTA-Knopf im Hero (Entscheidung 18.10.2026): ab 1024 px steht rechts der Fragebogen, auf Handy/Tablet folgt er im Sheet nach dem Video.
 */
export function Hero() {
  return (
    <StackBack className="bg-stone text-ink">
      <section aria-labelledby="hero-title" className="relative">
        <div className="paper-grain absolute inset-0 overflow-hidden">
          <div className="intro-fade absolute -left-[12%] -top-[22%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),rgb(255_255_255/0)_70%)] blur-2xl" />
          <div className="absolute -bottom-[30%] -right-[10%] h-[75%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(214_184_146/0.32),transparent)] blur-2xl" />
          <HeroLine draw className="hidden text-caramel-500/45 md:block" />
          <HeroLine variant="mobile" draw className="translate-y-[13svh] text-caramel-500/45 short:hidden md:hidden" />
        </div>

        <div className="wrap-wide relative flex min-h-[max(34rem,100svh)] flex-col justify-end pb-[calc(var(--sheet-overlap)+2.75rem)] pt-28 md:min-h-[max(36rem,100svh)] lowtab:pt-24 md:justify-center md:pb-[calc(var(--sheet-overlap)+5rem)] xl:h-[max(36rem,100svh)] xl:min-h-0 xl:pb-12 xl:pt-[5.25rem]">
          <div className="max-w-[40rem] lg:max-w-[calc(100%-min(27rem,36vw)-3rem)] xl:max-w-[min(50%,46rem)]">
            <h1 id="hero-title">
              {/* Marke und Ort nur für Suchmaschinen und Screenreader: Joana stellt sich direkt darunter im Video vor */}
              <span className="sr-only">
                {site.name} in {site.address.city} und online:{' '}
              </span>
              <span className="t-hero block whitespace-nowrap text-espresso-900 max-md:text-[min(2.6rem,9.6vw)] lg:max-xl:text-[clamp(2.4rem,5.2vw,3.6rem)]">
                <span className="intro-rise block [--d:0.12s]">Stress verstehen.</span>{' '}
                <span className="intro-rise block [--d:0.26s]">Stress bewältigen.</span>{' '}
                <em className="intro-rise block font-normal italic text-caramel-600 [--d:0.4s]">Stress managen.</em>
              </span>
            </h1>
            <p className="intro-rise t-lead mt-6 max-w-[34rem] text-ink/75 [--d:0.56s] short:mt-3 short:text-base short:leading-normal xl:mt-7">
              Sie müssen Ihrem Stress nicht ausgeliefert sein. Ich begleite Sie persönlich dabei, ihn zu verstehen, passende Wege zu finden und
              Ihren Alltag spürbar zu entlasten.
            </p>
            <div className="intro-rise mt-7 flex [--d:0.7s] short:mt-4">
              <Link
                href="/angebote/"
                className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-espresso-800 underline decoration-caramel-500/60 underline-offset-[6px] transition-colors duration-500 hover:text-caramel-800"
              >
                Angebote ansehen
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 max-md:hidden xl:mt-10 xl:flex-nowrap xl:gap-x-4" aria-label="Auf einen Blick">
              {PUNKTE.map(({ text, Icon }, i) => (
                <li
                  key={text}
                  className="intro-pop flex items-center gap-2 whitespace-nowrap text-[0.875rem] font-medium text-espresso-700 xl:text-[0.8125rem] 2xl:text-[0.875rem]"
                  style={{ '--d': `${0.86 + i * 0.1}s` } as React.CSSProperties}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-caramel-700 shadow-[0_4px_10px_-6px_rgba(30,22,17,0.35)]">
                    <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ab 1024 px: Fragebogen zum Erstgespräch im Hero statt eines CTA (steht wie der Text, das Sheet schiebt sich darüber) */}
        <div
          id="erstgespraech-desktop"
          data-funnel-anchor
          className="intro-rise absolute right-8 top-[var(--hero-top)] z-20 hidden w-[min(27rem,36vw)] lowlg:top-[5.5rem] [--d:0.5s] lg:block xl:right-[var(--wrap-wide-x)] xl:w-[min(27rem,33vw)]"
        >
          {/* Kompakt genug, dass jeder Schritt ohne inneres Scrollen in den Hero passt */}
          <ErstgespraechFunnel variant="hero" idPrefix="jkh" />
        </div>
      </section>
    </StackBack>
  )
}

/** Fragebogen der Startseite auf Handy/Tablet: im Sheet nach dem Video (ab 1024 px steht er im Hero) */
export function HeroFunnel() {
  return (
    <div className="wrap-wide relative z-20 pb-4 lg:hidden">
      <div id="erstgespraech" data-funnel-anchor className="mx-auto max-w-[34rem] scroll-mt-24">
        <ErstgespraechFunnel variant="hero" />
      </div>
    </div>
  )
}
