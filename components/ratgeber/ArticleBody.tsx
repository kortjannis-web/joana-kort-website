import { Rich } from '@/components/ui/Rich'
import type { Block } from '@/lib/types'

/** Rendert die Inhaltsblöcke eines Ratgeber-Artikels (alles serverseitig, vollständig im HTML) */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-jk">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return (
              <p key={i}>
                <Rich text={b.text} />
              </p>
            )
          case 'h2':
            return (
              <h2 key={i} id={b.id} className="scroll-mt-28">
                {b.text}
              </h2>
            )
          case 'h3':
            return <h3 key={i}>{b.text}</h3>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Rich text={it} />
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Rich text={it} />
                  </li>
                ))}
              </ol>
            )
          case 'table':
            return (
              <figure key={i} className="floaty !mt-8 overflow-x-auto rounded-lg border border-line bg-white px-5 py-4 md:px-6 md:py-5">
                <table>
                  {b.caption && <caption className="pb-3 text-left font-semibold text-espresso-900">{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k}>
                            <Rich text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {b.source && (
                  <figcaption className="pt-3 text-[0.875rem] text-muted">
                    <Rich text={b.source} />
                  </figcaption>
                )}
              </figure>
            )
          case 'image':
            return (
              <figure key={i} className="!mt-8">
                <div className="paper-grain rounded-lg bg-stone p-4 md:p-6">
                  <img src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" decoding="async" className="paper w-full rounded-[3px]" />
                </div>
                {b.caption && <figcaption className="pt-3 text-[0.875rem] text-muted">{b.caption}</figcaption>}
              </figure>
            )
          case 'callout':
            return (
              <aside key={i} className="!mt-8 rounded-lg border border-line border-l-[3px] border-l-caramel-500 bg-caramel-50 px-5 py-5 md:px-6">
                <p className="font-semibold text-espresso-900">{b.title}</p>
                <p className="!mt-2">
                  <Rich text={b.text} />
                </p>
              </aside>
            )
        }
      })}
    </div>
  )
}
