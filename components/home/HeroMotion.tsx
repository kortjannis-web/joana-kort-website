'use client'

import type { ReactNode } from 'react'

/** Hero-CTA: führt zum Erstgespräch-Formular (mobil im Sheet, Desktop steht es daneben) und lässt es kurz aufleuchten */
export function FunnelCta({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#erstgespraech"
      className={className}
      onClick={(e) => {
        const target = Array.from(document.querySelectorAll<HTMLElement>('[data-funnel-anchor]')).find((el) => el.offsetParent !== null)
        if (!target) return
        e.preventDefault()
        const r = target.getBoundingClientRect()
        const inView = r.top >= 64 && r.top < window.innerHeight * 0.5
        if (!inView) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.dispatchEvent(new CustomEvent('jk:funnel-call'))
      }}
    >
      {children}
    </a>
  )
}
