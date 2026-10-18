import Link from 'next/link'
import { ArrowRight, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import { ErstgespraechFunnel } from '@/components/funnel/ErstgespraechFunnel'
import { buttonClass } from '@/components/ui/Button'
import { HeroLine } from '@/components/ui/HeroLine'
import { StackBack } from '@/components/ui/Stack'
import { FunnelCta } from './HeroMotion'
import { CTA_LABEL, ROLE, site } from '@/lib/site'
import { PORTRAIT } from '@/lib/images'

/** Drei Vertrauenspunkte direkt unter dem CTA (3er-Gruppe) */
const PUNKTE = [
  { text: 'Wissenschaftlich fundiert', Icon: GraduationCap },
  { text: 'Persönlich und vertraulich', Icon: ShieldCheck },
  { text: `${site.address.city} und online`, Icon: MapPin },
]

/**
 * Startseite Stufe 1 (Aufbau wie Vorlage, hell): Vollbild-Hero bleibt stehen, das Sheet schiebt sich darüber.
 * Beige Papierfläche mit Körnung, weichem Licht und der Markenlinie, die sich beim Laden zeichnet.
 * Intro (CSS, globals.css): Logo, dann nacheinander Zeile, Titelzeile 1, 2, 3, Text, CTA, Vertrauenspunkte, Karte, Header.
 * Desktop: Text links, Erstgespräch-Fragebogen rechts. Handy/Tablet: CTA führt zum Fragebogen im Sheet (nach dem Video).
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
          <div className="max-w-[40rem] xl:max-w-[min(50%,46rem)]">
            <h1 id="hero-title">
              {/* Marke gut sichtbar (Briefing Ä6): Name groß, darunter Ort. Mit Foto (PORTRAIT) steht es links daneben */}
              <span className="intro-rise flex items-center gap-3.5 [--d:0s]">
                {PORTRAIT && (
                  <img
                    src={PORTRAIT.src}
                    alt=""
                    width={PORTRAIT.w}
                    height={PORTRAIT.h}
                    className="h-14 w-14 shrink-0 rounded-md object-cover shadow-[0_6px_16px_-8px_rgba(30,22,17,0.5)] md:h-16 md:w-16"
                  />
                )}
                <span className="block">
                  <span className="block font-serif text-[clamp(1.375rem,1rem+1.6vw,2rem)] font-[450] leading-none tracking-[-0.01em] text-espresso-900">
                    Joana Kort <span className="font-medium text-caramel-700">Stressberatung</span>
                  </span>
                  <span className="t-label mt-2 block text-[0.6875rem] text-espresso-600 md:text-[0.75rem] lowtab:mt-1.5">
                    <span className="max-md:hidden">{ROLE.short} · </span>
                    {site.address.city} und online
                  </span>
                </span>
              </span>
              <span className="sr-only">: </span>
              <span className="t-hero mt-6 block whitespace-nowrap text-espresso-900 max-md:text-[min(2.6rem,9.6vw)] short:mt-3 md:mt-7 lowtab:mt-4">
                <span className="intro-rise block [--d:0.12s]">Stress verstehen.</span>
                <span className="intro-rise block [--d:0.26s]">Stress bewältigen.</span>
                <em className="intro-rise block font-normal italic text-caramel-600 [--d:0.4s]">Stress managen.</em>
              </span>
            </h1>
            <p className="intro-rise t-lead mt-6 max-w-[34rem] text-ink/75 [--d:0.56s] short:mt-3 short:text-base short:leading-normal xl:mt-7">
              Sie müssen Ihrem Stress nicht ausgeliefert sein. Ich begleite Sie persönlich dabei, ihn zu verstehen, passende Wege zu finden und
              Ihren Alltag spürbar zu entlasten.
            </p>
            <div className="intro-rise mt-8 flex flex-col gap-3 [--d:0.7s] short:mt-5 sm:flex-row sm:items-center sm:gap-6">
              <FunnelCta className={buttonClass('primary', 'lg', 'group w-full sm:w-auto xl:hidden')}>
                {CTA_LABEL}
                <ArrowRight className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 ease-[var(--ease-lift)] group-hover:translate-x-1.5" strokeWidth={2} aria-hidden="true" />
              </FunnelCta>
              <Link
                href="/angebote/"
                className="group inline-flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] font-semibold text-espresso-800 underline decoration-caramel-400/70 underline-offset-[6px] transition-colors duration-500 hover:text-caramel-800 sm:justify-start"
              >
                Angebote ansehen
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
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

        {/* Desktop: Fragebogen zum Erstgespräch im Hero (steht wie der Text, das Sheet schiebt sich darüber) */}
        <div
          id="erstgespraech-desktop"
          data-funnel-anchor
          className="intro-rise absolute right-[var(--wrap-wide-x)] top-[var(--hero-top)] z-20 hidden w-[min(27rem,33vw)] [--d:0.5s] xl:block"
        >
          {/* Kompakt genug, dass jeder Schritt ohne inneres Scrollen in den Hero passt */}
          <ErstgespraechFunnel variant="hero" idPrefix="jkh" />
        </div>
      </section>
    </StackBack>
  )
}

/** Fragebogen der Startseite auf Handy/Tablet: im Sheet nach dem Video (ab Desktop steht er im Hero) */
export function HeroFunnel() {
  return (
    <div className="wrap-wide relative z-20 pb-4 xl:hidden">
      <div id="erstgespraech" data-funnel-anchor className="mx-auto max-w-[34rem] scroll-mt-24">
        <ErstgespraechFunnel variant="hero" />
      </div>
    </div>
  )
}
