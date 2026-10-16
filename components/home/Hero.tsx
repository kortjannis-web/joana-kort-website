import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ErstgespraechFunnel } from '@/components/funnel/ErstgespraechFunnel'
import { buttonClass } from '@/components/ui/Button'
import { HeroLine } from '@/components/ui/HeroLine'
import { StackBack } from '@/components/ui/Stack'
import { FunnelCta } from './HeroMotion'
import { site } from '@/lib/site'

/**
 * Startseite Stufe 1: Vollbild-Hero bleibt stehen, das Sheet schiebt sich darüber.
 * Kein Foto (noch keine Fotos von Joana): Espresso-Fläche mit Papierkörnung, warmem Licht und der Markenlinie, die sich beim
 * ersten Laden zeichnet (Knoten unter dem Text, dann ruhige Linie). Der Slogan ist der Titel.
 * Desktop: Text links, Erstgespräch-Karte rechts im Hero. Handy/Tablet: CTA führt zur Karte oben im Sheet (HeroFunnel).
 */
export function Hero() {
  return (
    <StackBack className="bg-espresso-900 text-white">
      <section aria-labelledby="hero-title" className="relative">
        <div className="grain absolute inset-0 overflow-hidden">
          <div className="intro-fade absolute -right-[18%] -top-[28%] h-[90%] w-[75%] rounded-full bg-[radial-gradient(closest-side,rgb(232_168_119/0.2),rgb(214_184_146/0.07)_55%,transparent)] blur-2xl" />
          <div className="absolute -bottom-[35%] -left-[15%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(143_106_68/0.22),transparent)] blur-2xl" />
          <HeroLine draw className="hidden text-caramel-300/35 md:block" />
          <HeroLine variant="mobile" draw className="translate-y-[14svh] text-caramel-300/40 short:hidden md:hidden" />
        </div>

        <div className="wrap-wide relative flex min-h-[max(34rem,100svh)] flex-col justify-end pb-[calc(var(--sheet-overlap)+3.5rem)] pt-28 md:min-h-[max(36rem,100svh)] md:justify-center md:pb-[calc(var(--sheet-overlap)+5rem)] md:pt-28 xl:h-[max(36rem,100svh)] xl:min-h-0 xl:justify-center xl:pb-12 xl:pt-[5.25rem]">
          <div className="max-w-[40rem] xl:max-w-[min(50%,46rem)]">
            <h1 id="hero-title">
              <span className="intro-up t-label block text-caramel-300 [--d:0s] max-md:text-[0.75rem] max-md:tracking-[0.12em]">
                Stressberatung und Stresscoaching
                <span className="max-md:block"> in {site.address.city} und online</span>
              </span>
              <span className="intro-up t-hero mt-5 block whitespace-nowrap text-white [--d:0.135s] max-md:text-[min(2.6rem,9.6vw)] short:mt-3 md:mt-6">
                Stress verstehen.
                <br />
                Stress bewältigen.
                <br />
                <em className="font-normal italic text-terra-300">Stress managen.</em>
              </span>
            </h1>
            <p className="intro-up t-lead mt-6 max-w-[34rem] text-white/85 [--d:0.27s] short:mt-3 short:text-base short:leading-normal xl:mt-7">
              Sie müssen Ihrem Stress nicht ausgeliefert sein. Ich begleite Sie persönlich dabei, ihn zu verstehen, passende Wege zu finden und
              Ihren Alltag spürbar zu entlasten.
            </p>
            <div className="intro-up mt-8 flex flex-col gap-3 [--d:0.405s] short:mt-5 sm:flex-row sm:items-center sm:gap-6">
              {/* Handy/Tablet: führt zur Karte im Sheet. Desktop: Karte steht daneben, hier nur der Weg zum Ansatz */}
              <FunnelCta className={buttonClass('primary', 'lg', 'group w-full sm:w-auto xl:hidden')}>
                Kostenloses Erstgespräch
                <ArrowRight className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 ease-[var(--ease-lift)] group-hover:translate-x-1.5" strokeWidth={2} aria-hidden="true" />
              </FunnelCta>
              <Link
                href="/mein-ansatz/"
                className="group inline-flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] font-semibold text-white/90 underline decoration-terra-300/50 underline-offset-[6px] transition-colors duration-500 hover:text-terra-200 sm:justify-start"
              >
                So arbeite ich
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop: Erstgespräch-Karte im Hero (steht wie der Text, das Sheet schiebt sich darüber). Höhe begrenzt, längere Schritte scrollen in der Karte */}
        <div
          id="erstgespraech-desktop"
          data-funnel-anchor
          className="intro-up absolute right-[var(--wrap-wide-x)] top-[var(--hero-top)] z-20 hidden w-[min(31rem,37vw)] [--d:0.54s] xl:block"
        >
          <ErstgespraechFunnel
            variant="hero"
            idPrefix="jkh"
            className="max-h-[calc(max(36rem,100svh)-var(--hero-top)-var(--sheet-overlap)-3.25rem)]"
            bodyClassName="overflow-y-auto overscroll-contain [scrollbar-width:thin]"
          />
        </div>
      </section>
    </StackBack>
  )
}

/** Erstgespräch-Karte der Startseite auf Handy/Tablet: oben im Sheet unter dem Hero (ab Desktop steht sie im Hero) */
export function HeroFunnel() {
  return (
    <div className="wrap-wide relative z-20 xl:hidden">
      <div id="erstgespraech" data-funnel-anchor className="mx-auto max-w-[34rem] scroll-mt-24 pt-12 md:pt-16">
        <ErstgespraechFunnel variant="hero" />
      </div>
    </div>
  )
}
