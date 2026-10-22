import { REVIEWS, fmtReviewDate } from '@/lib/content/reviews'
import { site } from '@/lib/site'
import { buttonClass } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { GoogleIcon, Stars } from '@/components/ui/icons'
import { Reveal } from '@/components/ui/Reveal'
import { ReviewText } from './ReviewText'

const AVATAR = ['bg-espresso-800 text-white', 'bg-caramel-100 text-caramel-800', 'bg-caramel-100 text-caramel-800']

/**
 * Kundenstimmen / Google-Bewertungen (lib/content/reviews.ts). Solange keine echten Stimmen vorliegen: nichts (Briefing: keine erfundenen Referenzen).
 * Desktop: drei nebeneinander mit Pfeilen, Handy: wischen, Texte eingeklappt (ReviewText).
 */
export function Reviews({ title = 'Wie andere die Zusammenarbeit erlebt haben', start = 0 }: { title?: string; start?: number }) {
  if (!REVIEWS.length) return null
  const list = [...REVIEWS.slice(start), ...REVIEWS.slice(0, start)]
  const idBase = `stimme-${start}`
  const allUrl = site.google.reviewsUrl || site.google.profileUrl
  return (
    <section aria-labelledby="stimmen-title" className="bg-stone sec">
      <div className="wrap">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 id="stimmen-title" className="t-h2 max-w-[22ch] text-espresso-900">
            {title}
          </h2>
          {allUrl && (
            <a href={allUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'md', 'hidden shrink-0 bg-white md:inline-flex')}>
              <GoogleIcon className="h-4.5 w-4.5" /> Alle Bewertungen bei Google
            </a>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 xl:mt-10">
          <Carousel labelledBy="stimmen-title" arrowLabel="Stimmen" item="84vw" bleed itemClassName="self-start">
            {list.map((r, i) => (
              <figure
                key={r.name + r.date}
                className="floaty flex flex-col rounded-lg border border-line bg-white p-5 transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 xl:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars className="inline-flex gap-0.5 text-caramel-500" starClassName="h-4 w-4" />
                  {r.source === 'Google' && <GoogleIcon className="h-4.5 w-4.5" />}
                </div>
                <ReviewText text={r.text} id={`${idBase}-${i}`} />
                <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                  <span aria-hidden="true" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[0.875rem] font-semibold ${AVATAR[i % AVATAR.length]}`}>
                    {r.initials}
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[0.9375rem] font-semibold text-espresso-900">{r.name}</span>
                    <span className="mt-1 block text-[0.875rem] text-muted">
                      {r.context} · {fmtReviewDate(r.date)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
