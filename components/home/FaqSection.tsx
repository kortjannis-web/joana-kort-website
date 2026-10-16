import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqList } from '@/components/ui/FaqList'
import type { Faq } from '@/lib/types'

export function FaqSection({
  faqs,
  title = 'Häufige Fragen zu Stressberatung und Stresscoaching',
  intro,
  moreLink = true,
  moreLabel = 'Alle Fragen und Antworten',
  id = 'fragen',
}: {
  faqs: Faq[]
  title?: string
  intro?: string
  moreLink?: boolean
  moreLabel?: string
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
              <Link href="/haeufige-fragen/" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-espresso-800 underline decoration-caramel-400/70 underline-offset-[0.3em] hover:text-caramel-800">
                {moreLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
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
