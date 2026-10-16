import Link from 'next/link'
import { FaqList } from '@/components/ui/FaqList'
import type { Faq } from '@/lib/types'

export function FaqSection({
  faqs,
  title = 'Häufige Fragen zu Stressberatung und Stresscoaching',
  intro,
  moreLink = true,
  id = 'fragen',
}: {
  faqs: Faq[]
  title?: string
  intro?: string
  moreLink?: boolean
  id?: string
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="pb-28 pt-20 md:pb-36 md:pt-28 xl:pb-44 xl:pt-32">
      <div className="wrap grid gap-10 xl:grid-cols-12 xl:gap-16">
        <div className="xl:col-span-5">
          <div className="xl:sticky xl:top-32">
            <h2 id={`${id}-title`} lang="de" className="t-h2 hyphens-auto text-espresso-900">
              {title}
            </h2>
            {intro && <p className="t-lead mt-5 text-muted">{intro}</p>}
            {moreLink && (
              <Link href="/haeufige-fragen/" className="link mt-6 inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            )}
          </div>
        </div>
        <div className="xl:col-span-7">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  )
}
