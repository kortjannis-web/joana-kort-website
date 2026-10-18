import { Plus } from 'lucide-react'
import { Rich } from '@/components/ui/Rich'
import { Reveal } from '@/components/ui/Reveal'
import type { Faq } from '@/lib/types'

/**
 * FAQ-Akkordeon im Design der Unterseiten (Fragen, Ratgeber): große Zeilen, Plus-Kreis, erste Frage optional offen.
 * <details>: Antworten stehen immer im HTML (SEO/GEO, FAQPage-Schema), funktioniert ohne JavaScript.
 * Einträge blenden gestaffelt ein (Reveal).
 */
export function FaqAccordion({
  faqs,
  headingLevel = 3,
  openFirst = false,
}: {
  faqs: Faq[]
  headingLevel?: 2 | 3
  openFirst?: boolean
}) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="border-t border-line">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={Math.min(i, 6) * 0.04} y={12}>
          <details className="faq-item group border-b border-line" open={openFirst && i === 0}>
            <summary className="flex min-h-[clamp(3.25rem,7svh,4.75rem)] cursor-pointer list-none items-center justify-between gap-4 py-[clamp(0.5rem,1.4svh,0.75rem)]">
              <H className="text-[0.9375rem] font-semibold leading-snug text-ink transition-colors duration-500 ease-[var(--ease-soft)] group-hover:text-espresso-800 md:text-[clamp(1rem,0.8rem+0.7svh,1.125rem)]">
                {f.q}
              </H>
              <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#ddd3c6] text-espresso-800 transition-[transform,border-color,color] duration-300 ease-[var(--ease-soft)] group-hover:border-caramel-500/60 group-hover:text-caramel-700">
                <Plus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </summary>
            <div className="faq-body">
              <p className="max-w-[45rem] pb-6 pr-10 text-[0.9375rem] leading-[1.7] text-muted md:pr-12 md:text-base">
                <Rich text={f.a} />
              </p>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  )
}
