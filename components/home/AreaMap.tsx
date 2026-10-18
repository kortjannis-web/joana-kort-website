import { InView } from '@/components/ui/InView'
import { site } from '@/lib/site'

/**
 * Umkreis um Gummersbach (etwa 20 km) als ruhige Grafik: Kreis zeichnet sich, Gummersbach pulsiert, die Orte ploppen nacheinander auf.
 * Positionen aus den Ortskoordinaten (Entfernung in km, Nord oben), keine Kartenkacheln, kein Fremdanbieter.
 * CSS: .area-map in globals.css. Ohne JS: fertiges Bild.
 */
const ORTE: { name: string; x: number; y: number; side: 'l' | 'r' }[] = [
  { name: 'Marienheide', x: -2.5, y: -6.3, side: 'r' },
  { name: 'Meinerzhagen', x: 5.2, y: -8.9, side: 'r' },
  { name: 'Bergneustadt', x: 6.3, y: 0.2, side: 'r' },
  { name: 'Lindlar', x: -13.2, y: 0.8, side: 'l' },
  { name: 'Engelskirchen', x: -10.5, y: 4.2, side: 'l' },
  { name: 'Wiehl', x: -1, y: 8.5, side: 'r' },
  { name: 'Nümbrecht', x: -1.6, y: 13.4, side: 'l' },
  { name: 'Reichshof', x: 5.9, y: 12.5, side: 'r' },
]

export function AreaMap() {
  return (
    <InView className="area-map grain absolute inset-0 flex items-center justify-center p-4" threshold={0.4}>
      <svg viewBox="-26 -24 52 48" className="h-full max-h-[26rem] w-full" role="img" aria-label={`Umkreis von etwa ${site.radiusKm} Kilometern um ${site.address.city} mit den umliegenden Orten`}>
        <circle cx="0" cy="0" r="10" fill="none" stroke="rgb(214 184 146 / 0.18)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
        <circle className="area-ring" cx="0" cy="0" r="20" fill="rgb(214 184 146 / 0.05)" stroke="#d6b892" strokeWidth="0.22" pathLength={1} transform="rotate(-90)" />
        <text x="14.6" y="-14.2" fontSize="1.5" fill="#d6b892" fontFamily="var(--font-dmsans)" letterSpacing="0.1">
          {site.radiusKm} km
        </text>
        {ORTE.map((o, i) => (
          <g key={o.name}>
            <circle className="area-dot" style={{ '--i': i } as React.CSSProperties} cx={o.x} cy={o.y} r="0.55" fill="#d6b892" />
            <text
              className="area-label"
              style={{ '--i': i } as React.CSSProperties}
              x={o.side === 'r' ? o.x + 1.2 : o.x - 1.2}
              y={o.y + 0.55}
              textAnchor={o.side === 'r' ? 'start' : 'end'}
              fontSize="1.55"
              fill="rgb(236 228 218 / 0.85)"
              fontFamily="var(--font-dmsans)"
            >
              {o.name}
            </text>
          </g>
        ))}
        <circle className="area-pulse" cx="0" cy="0" r="1.2" fill="#d6b892" />
        <circle cx="0" cy="0" r="1.05" fill="#d6b892" stroke="#2a211b" strokeWidth="0.3" />
        <text x="0" y="3.6" textAnchor="middle" fontSize="2" fill="#fff" fontFamily="var(--font-manrope)" fontWeight="600">
          {site.address.city}
        </text>
      </svg>
      <span className="absolute bottom-4 left-4 rounded-md border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-caramel-200">
        Online: überall
      </span>
    </InView>
  )
}
