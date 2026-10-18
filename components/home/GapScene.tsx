import { InView } from '@/components/ui/InView'

/**
 * Der zentrale Schmerzpunkt als Bild: zwischen "Ich weiß, was ich ändern sollte" und "Es klappt im Alltag" klafft eine Lücke
 * (gestrichelt, unterbrochen). Beim Hinscrollen zieht sich eine Linie darüber (Bordeaux), dann erscheint "Hier setze ich an".
 * CSS: .gap-scene in globals.css. Ohne JS: fertiges Bild.
 */
export function GapScene() {
  return (
    <InView className="gap-scene relative" threshold={0.45}>
      <div className="paper-grain floaty overflow-hidden rounded-xl border border-line bg-stone px-5 pb-4 pt-5 md:px-8 md:pb-[clamp(1.25rem,3svh,2.25rem)] md:pt-[clamp(1.5rem,3.5svh,2.5rem)]">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[11rem] md:max-w-[14rem]">
            <p className="t-label text-[0.6875rem] text-bordeaux md:text-[0.75rem]">Wissen</p>
            <p className="mt-2 font-serif text-[1.0625rem] leading-snug text-espresso-900 md:text-[clamp(1.125rem,0.8rem+1.1svh,1.375rem)]">„Ich weiß, dass ich etwas ändern müsste.“</p>
          </div>
          <div className="gap-end-right max-w-[11rem] text-right md:max-w-[14rem]">
            <p className="t-label text-[0.6875rem] text-bordeaux md:text-[0.75rem]">Umsetzung</p>
            <p className="mt-2 font-serif text-[1.0625rem] leading-snug text-espresso-900 md:text-[clamp(1.125rem,0.8rem+1.1svh,1.375rem)]">
              „Es <em className="italic text-caramel-700">klappt</em> in meinem Alltag.“
            </p>
          </div>
        </div>

        <div className="relative mt-3 md:mt-[clamp(0.75rem,2svh,1.5rem)]">
          <svg viewBox="0 0 600 150" className="block w-full overflow-visible" aria-hidden="true" fill="none">
            {/* Ohne Begleitung: zwei Enden, dazwischen die Lücke */}
            <path d="M24 110 H220" stroke="#c09a70" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
            <path d="M380 110 H576" stroke="#c09a70" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
            <circle cx="24" cy="110" r="7" fill="#2a211b" />
            <circle cx="576" cy="110" r="7" fill="#8f6a44" />
            {/* Brücke: zieht sich in einem ruhigen Bogen über die Lücke */}
            <path className="gap-bridge" pathLength={1} d="M24 110 C 150 110 190 28 300 28 C 410 28 450 110 576 110" stroke="#7c2430" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="absolute left-1/2 top-[54%] -translate-x-1/2 text-center text-[0.8125rem] italic text-muted md:text-[0.9375rem]">die Lücke</p>
          <span className="gap-chip absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[85%] whitespace-nowrap rounded-full bg-espresso-800 px-4 py-2 text-[0.8125rem] font-semibold text-white shadow-[0_10px_20px_-10px_rgba(30,22,17,0.6)] md:text-[0.875rem]">
            Hier setze ich an
          </span>
        </div>
      </div>
    </InView>
  )
}
