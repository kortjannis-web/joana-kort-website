import { MATERIAL, type Img } from '@/lib/images'
import { cn } from '@/lib/utils'

type Paper = {
  img: Img
  /** Position und Breite im Rahmen (Prozent), Drehung, Auffächern beim Hover */
  style: { left: string; top: string; width: string; rotate: number; fan: string; z: number }
}

/**
 * Joanas Materialien als Papierstapel: Blätter liegen leicht gedreht übereinander und fächern sich beim Hover auf (.paper in globals.css).
 * Zeigt konkret, womit in der Begleitung gearbeitet wird (Briefing: Beispiel für Materialien). Bilder aus den PDFs (lib/images.ts).
 */
const LAYOUTS: Record<'tagebuch' | 'planer' | 'hero', { ratio: string; papers: Paper[] }> = {
  tagebuch: {
    ratio: 'aspect-[10/8]',
    papers: [
      { img: MATERIAL.tagebuchWoche, style: { left: '0%', top: '4%', width: '78%', rotate: -6, fan: 'translate(-5%, -3%) rotate(-9deg)', z: 1 } },
      { img: MATERIAL.tagebuchAnleitung, style: { left: '20%', top: '16%', width: '78%', rotate: 4, fan: 'translate(5%, -2%) rotate(6deg)', z: 2 } },
      { img: MATERIAL.tagebuchTitel, style: { left: '9%', top: '34%', width: '78%', rotate: -1.5, fan: 'translate(0, 5%) rotate(-1deg)', z: 3 } },
    ],
  },
  planer: {
    ratio: 'aspect-[10/9]',
    papers: [
      { img: MATERIAL.wochenfokus, style: { left: '52%', top: '0%', width: '42%', rotate: 5, fan: 'translate(6%, -4%) rotate(8deg)', z: 1 } },
      { img: MATERIAL.tagesplaner, style: { left: '6%', top: '2%', width: '40%', rotate: -5, fan: 'translate(-6%, -4%) rotate(-8deg)', z: 2 } },
      { img: MATERIAL.tagebuchRueckblick, style: { left: '12%', top: '44%', width: '76%', rotate: -1, fan: 'translate(0, 6%) rotate(0deg)', z: 3 } },
    ],
  },
  hero: {
    ratio: 'aspect-[10/9]',
    papers: [
      { img: MATERIAL.tagesplaner, style: { left: '58%', top: '2%', width: '36%', rotate: 6, fan: 'translate(6%, -4%) rotate(9deg)', z: 1 } },
      { img: MATERIAL.tagebuchWoche, style: { left: '0%', top: '12%', width: '74%', rotate: -5, fan: 'translate(-5%, -3%) rotate(-8deg)', z: 2 } },
      { img: MATERIAL.tagebuchTitel, style: { left: '14%', top: '42%', width: '76%', rotate: 1.5, fan: 'translate(2%, 6%) rotate(2deg)', z: 3 } },
    ],
  },
}

export function PaperStack({ layout = 'tagebuch', className, priority = false }: { layout?: keyof typeof LAYOUTS; className?: string; priority?: boolean }) {
  const l = LAYOUTS[layout]
  return (
    <div className={cn('paper-stack relative', l.ratio, className)}>
      {l.papers.map(({ img, style: s }) => (
        <img
          key={img.src}
          src={img.src}
          srcSet={img.srcSet}
          sizes="(min-width: 1200px) 32vw, (min-width: 768px) 50vw, 80vw"
          alt={img.alt}
          width={img.w}
          height={img.h}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="paper absolute h-auto rounded-md bg-paper"
          style={
            {
              left: s.left,
              top: s.top,
              width: s.width,
              zIndex: s.z,
              transform: `rotate(${s.rotate}deg)`,
              '--fan': s.fan,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
