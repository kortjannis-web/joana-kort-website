import { LogoMark } from '@/components/layout/Logo'
import { PORTRAIT } from '@/lib/images'
import { cn } from '@/lib/utils'

/**
 * Rahmen für Joanas Foto (kantig, Briefing Ä6): dünne Linie mit kleinem Abstand, schwebender Schatten.
 * Solange es kein Foto gibt (PORTRAIT = null in lib/images.ts): Espresso-Fläche mit Monogramm und Markenlinie, bewusst kein Stockfoto.
 * `fill`: füllt die Höhe des Elternelements, sonst 4:5.
 */
export function PortraitFrame({ className, fill = false, priority = false }: { className?: string; fill?: boolean; priority?: boolean }) {
  return (
    <div className={cn('@container', fill && 'h-full', className)}>
      <div className={cn('floaty rounded-lg border border-[#ddd3c6] bg-white p-1.5', fill && 'h-full')}>
        <div className={cn('relative overflow-hidden rounded-md bg-espresso-800', fill ? 'h-full' : 'aspect-[4/5]')}>
          {PORTRAIT ? (
            <img
              src={PORTRAIT.src}
              srcSet={PORTRAIT.srcSet}
              sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 90vw"
              alt={PORTRAIT.alt}
              width={PORTRAIT.w}
              height={PORTRAIT.h}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-5 text-center">
              <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(closest-side,rgb(214_184_146/0.18),transparent)]" />
              <span className="relative font-serif text-[clamp(4rem,22cqw,7.5rem)] leading-none text-caramel-300">JK</span>
              <LogoMark className="relative w-[42%] text-caramel-300/80" strokeWidth={1.6} />
              <span className="t-label relative text-[0.6875rem] text-caramel-300/90">Joana Kort</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
