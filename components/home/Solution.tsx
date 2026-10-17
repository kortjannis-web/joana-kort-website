import { LogoMark } from '@/components/layout/Logo'
import { Reveal } from '@/components/ui/Reveal'
import { ValueCards, ValueCarousel } from './ValueCards'

function Quote({ size }: { size: 'lg' | 'sm' }) {
  return (
    <figure className="relative">
      <blockquote
        className={
          size === 'lg'
            ? 'font-display text-[clamp(1.5rem,min(1.15rem+2.2vw,0.6rem+3.6svh),3rem)] font-normal leading-[1.2] tracking-[-0.012em] text-white'
            : 'font-display text-[clamp(1.35rem,min(1rem+3.6vw,0.5rem+3svh),2.1rem)] font-normal leading-[1.22] tracking-[-0.012em] text-white'
        }
      >
        „Mir hat damals jemand gefehlt, der mit mir Schritt für Schritt schaut, wie mein Stress entsteht und wie ich ihn abbauen kann.{' '}
        <em className="italic text-caramel-300">Diese Person möchte ich heute für andere sein.</em>“
      </blockquote>
      <figcaption className={size === 'lg' ? 'mt-[clamp(1rem,3svh,2rem)] flex items-center gap-4 text-[0.9375rem] text-espresso-200' : 'mt-6 flex items-center gap-3 text-[0.9375rem] text-espresso-200'}>
        <span className="h-px w-10 bg-caramel-300" aria-hidden="true" />
        Joana Kort{size === 'lg' ? ', Stressberatung' : ''}
      </figcaption>
    </figure>
  )
}

/**
 * Stufe 3: Die Antwort. Espresso-Fläche (Kontrast), bleibt stehen, die drei Schwerpunkte schieben sich als Sheet darüber.
 * Handy: Werte + Zitat als wischbare Reihe (Loop). Ab Tablet: Werte unter dem Text, Zitat groß daneben mit ruhig "atmendem" Kreis.
 */
export function Solution() {
  return (
    <section aria-labelledby="loesung-title" className="grain sec-t overflow-hidden bg-espresso-800 pb-[calc(var(--sec-y)+var(--sheet-overlap)+1rem)] text-white xl:flex xl:min-h-svh xl:items-center xl:pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
      <div className="wrap grid gap-[var(--sec-gap)] md:grid-cols-12 md:items-center md:gap-x-10 xl:gap-x-20">
        <Reveal className="md:col-span-6 xl:col-span-5">
          <p className="t-label text-caramel-300">Die Antwort</p>
          <h2 id="loesung-title" className="t-h2 mt-3 text-white">
            Nicht noch mehr Tipps. Ein Plan, der zu <em className="italic text-caramel-300">Ihrem</em> Leben passt.
          </h2>
          <p className="t-lead mt-[clamp(0.75rem,2svh,1.5rem)] text-espresso-100/90 compact:hidden max-md:text-[0.9375rem] max-md:leading-relaxed">
            Oft heißt es: Sie müssen Ihren Stress reduzieren. Wie das konkret gehen soll, bleibt offen. Ich arbeite mit Ihnen an genau dieser
            Stelle: Wir verstehen, wie Ihr Stress entsteht, finden Methoden, die zu Ihnen passen, und gestalten Ihren Alltag so, dass er Sie
            entlastet.
          </p>
          <div className="hidden md:block">
            <ValueCards />
          </div>
          <div className="mt-[clamp(1rem,3svh,2rem)] md:hidden">
            <ValueCarousel quote={<Quote size="sm" />} />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative hidden md:col-span-6 md:block xl:col-span-7 xl:pl-10">
          {/* Ruhig atmender Kreis (10 s), rein dekorativ */}
          <span aria-hidden="true" className="breathe absolute -left-6 -top-16 h-72 w-72 rounded-full border border-caramel-300/20 xl:-left-4 xl:-top-24 xl:h-96 xl:w-96" />
          <LogoMark className="absolute -right-6 -top-8 hidden w-56 text-white/[0.06] xl:block" />
          <Quote size="lg" />
        </Reveal>
      </div>
    </section>
  )
}
