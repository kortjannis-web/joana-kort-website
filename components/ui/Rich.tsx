import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'

/**
 * Minimaler Renderer für Rich-Text aus lib/content:
 *   **fett**  und  [Text](/pfad/) bzw. [Text](https://…)
 */
export function Rich({ text }: { text: string }) {
  return <>{render(text)}</>
}

function render(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={i++}>{text.slice(last, m.index)}</Fragment>)
    if (m[1]) {
      out.push(<strong key={i++}>{render(m[1])}</strong>)
    } else {
      const href = m[3]
      const label = m[2]
      out.push(
        href.startsWith('/') ? (
          <Link key={i++} href={href} className="link">
            {label}
          </Link>
        ) : (
          <a key={i++} href={href} className="link" target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        )
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>)
  return out
}

/** Rich-Text ohne Auszeichnung, z. B. für JSON-LD */
export const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
