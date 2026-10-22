import { Compass, HeartHandshake, MessagesSquare, Play } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { VIDEO } from '@/lib/images'
import { PORTRAIT } from '@/lib/portrait'
import { CTA_LABEL, ERSTGESPRAECH, SITE_URL, site } from '@/lib/site'

const PUNKTE = [
  { title: 'Wer ich bin', text: 'Gesundheitspsychologie, eigene Erfahrung mit Stress, Mutter und Studentin.', Icon: HeartHandshake },
  { title: 'Wie ich arbeite', text: 'Strukturiert, praktisch und so, dass es in Ihren Alltag passt.', Icon: Compass },
  { title: 'Was Sie erwartet', text: '15 Minuten Kennenlernen, Ihre Fragen und ein ehrlicher Rat.', Icon: MessagesSquare },
]

/**
 * Vertrauen zuerst: Joana stellt sich im Video vor (direkt unter dem Hero, erster Block im Sheet).
 * Video selbst gehostet (lib/images.ts → VIDEO). Solange es fehlt: Joanas Foto (PORTRAIT) mit leuchtendem Play-Knopf (nicht klickbar),
 * ohne Foto ein ruhiger Platzhalter.
 * Rechts drei Punkte (3er-Gruppe) und der CTA zum Erstgespräch.
 */
export function VideoIntro() {
  return (
    <section aria-labelledby="video-title" className="sec">
      {VIDEO && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: `${site.owner} stellt sich vor`,
            description: 'Joana Kort erklärt, wie sie Menschen dabei begleitet, Stress zu verstehen, zu bewältigen und ihren Alltag zu entlasten.',
            thumbnailUrl: `${SITE_URL}${VIDEO.poster}`,
            contentUrl: `${SITE_URL}${VIDEO.src}`,
            uploadDate: VIDEO.uploadDate,
            ...(VIDEO.duration ? { duration: VIDEO.duration } : {}),
          }}
        />
      )}
      <div className="wrap grid items-center gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
        <Reveal className="lg:col-span-7">
          <div className="floaty-lg relative mx-auto max-w-[calc((100svh-12rem)*16/9)] overflow-hidden rounded-xl bg-espresso-800 lg:max-w-none">
            {VIDEO ? (
              <video controls playsInline preload="none" poster={VIDEO.poster} className="block aspect-video w-full bg-espresso-900 object-cover">
                <source src={VIDEO.src} type="video/mp4" />
                {VIDEO.captions && <track kind="captions" src={VIDEO.captions} srcLang="de" label="Deutsch" default />}
              </video>
            ) : (
              <div className="grain relative grid aspect-video w-full place-items-center overflow-hidden" role="img" aria-label={PORTRAIT ? PORTRAIT.alt : 'Platzhalter für das Vorstellungsvideo von Joana Kort'}>
                {PORTRAIT ? (
                  <>
                    <img src={PORTRAIT.src} alt="" width={PORTRAIT.w} height={PORTRAIT.h} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_17_13/0.05)_40%,rgb(23_17_13/0.62))]" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(214_184_146/0.22),transparent_55%)]" />
                    <span className="absolute left-5 top-5 font-serif text-[3.5rem] italic leading-none text-caramel-300/25 md:left-8 md:top-7 md:text-[5.5rem]">JK</span>
                  </>
                )}
                <span className="relative grid h-20 w-20 place-items-center md:h-24 md:w-24">
                  <span aria-hidden="true" className="play-glow absolute -inset-6 rounded-full" />
                  <span aria-hidden="true" className="play-ring absolute inset-0 rounded-full border-2 border-caramel-200/80" />
                  <span aria-hidden="true" className="play-ring absolute inset-0 rounded-full border-2 border-caramel-200/60 [animation-delay:1.2s]" />
                  <span className="relative grid h-full w-full place-items-center rounded-full bg-paper text-espresso-800 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6),0_0_34px_6px_rgb(232_196_150/0.55)]">
                    <Play className="ml-1 h-8 w-8 fill-current md:h-9 md:w-9" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-7">
                  <span className="text-left text-white">
                    <span className="block font-serif text-[1.25rem] leading-tight md:text-[1.6rem]">{site.owner} stellt sich vor</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <p className="t-label text-caramel-700">Persönlich vorgestellt</p>
          <h2 id="video-title" className="t-h2 mt-3 text-espresso-900">
            Lernen Sie mich <em className="italic text-caramel-600">kennen</em>
          </h2>
          <ul className="mt-[clamp(1rem,2.5svh,1.5rem)] border-t border-line">
            {PUNKTE.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4 border-b border-line py-[clamp(0.625rem,1.8svh,1rem)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.625rem] bg-stone text-caramel-700">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-espresso-900">{title}</span>
                  <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href={ERSTGESPRAECH} className="group mt-[clamp(1rem,3svh,1.75rem)] w-full sm:w-auto max-xl:hidden">
            {CTA_LABEL}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
