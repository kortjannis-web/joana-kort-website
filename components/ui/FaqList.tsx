import { Plus } from 'lucide-react'
import { Rich } from './Rich'
import type { Faq } from '@/lib/types'

/** Akkordeon mit <details>: Antworten stehen immer im HTML (SEO/GEO), funktioniert ohne JavaScript. */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="border-t border-line">
      {faqs.map((f) => (
        <details key={f.q} className="faq-item group border-b border-line">
          <summary className="flex min-h-[clamp(3.25rem,7svh,4rem)] cursor-pointer list-none items-center justify-between gap-4 py-[clamp(0.5rem,1.4svh,1rem)] md:gap-6">
            <H className="text-[0.9375rem] font-semibold leading-snug text-espresso-900 transition-colors duration-500 group-hover:text-bordeaux md:text-[clamp(1rem,0.8rem+0.7svh,1.125rem)]">{f.q}</H>
            <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso-800/20 text-espresso-800 transition-[transform,border-color,color] duration-500 ease-[var(--ease-soft)] group-hover:border-caramel-500/60 group-hover:text-caramel-700">
              <Plus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </summary>
          <div className="faq-body">
            <p className="max-w-[68ch] pb-6 pr-12 leading-relaxed text-ink/85">
              <Rich text={f.a} />
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}
