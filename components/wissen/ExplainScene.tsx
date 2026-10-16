import type { SceneKey } from '@/lib/content/wissen'
import { cn } from '@/lib/utils'

/**
 * Erklär-Animationen für "Stress verstehen" (reines SVG + CSS in globals.css, Klassen .ex-*).
 * Laufen einmal an, sobald sie sichtbar werden (Eltern-InView mit Klasse `explain`), kleine Bewegungen danach in Ruhe weiter.
 * Ohne JS oder bei reduzierter Bewegung: fertiges Endbild. Beschriftung = die drei Stichworte des Themas.
 */

const C = {
  line: '#e6ddd1',
  ink: '#3a2e26',
  soft: '#8c7c6e',
  car: '#8f6a44',
  car4: '#c09a70',
  car2: '#e6d3b8',
  car1: '#f1e6d6',
}

const Label = ({ x, y, children, anchor = 'middle', d }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end'; d?: number }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={12.5}
    fontWeight={600}
    fill={C.soft}
    letterSpacing="0.02em"
    className="ex-fade"
    style={d !== undefined ? ({ '--d': `${d}s` } as React.CSSProperties) : undefined}
  >
    {children}
  </text>
)

function Puls({ l }: { l: [string, string, string] }) {
  return (
    <>
      <line x1="16" y1="112" x2="304" y2="112" stroke={C.line} strokeWidth="1.5" strokeDasharray="3 5" />
      <line x1="92" y1="30" x2="92" y2="150" stroke={C.line} strokeWidth="1" strokeDasharray="2 4" />
      <line x1="178" y1="30" x2="178" y2="150" stroke={C.line} strokeWidth="1" strokeDasharray="2 4" />
      <path
        className="ex-draw"
        pathLength={1}
        d="M16 112 H90 L98 104 L106 120 L118 40 L132 146 L144 78 L154 126 L164 100 L174 116 C 192 124 204 102 222 110 C 240 117 252 108 268 112 H304"
        fill="none"
        stroke={C.car}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="ex-fade" style={{ '--d': '1.1s' } as React.CSSProperties}>
        <circle className="ex-pulse" cx="118" cy="40" r="9" fill={C.car2} style={{ '--d': '1.6s' } as React.CSSProperties} />
        <circle cx="118" cy="40" r="4" fill={C.car} />
      </g>
      <Label x={54} y={170} d={0.3}>
        {l[0]}
      </Label>
      <Label x={135} y={170} d={0.9}>
        {l[1]}
      </Label>
      <Label x={241} y={170} d={1.6}>
        {l[2]}
      </Label>
    </>
  )
}

function Waage({ l }: { l: [string, string, string] }) {
  return (
    <>
      <path d="M160 50 V148 M130 148 H190" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <g className="ex-beam">
        <line x1="80" y1="50" x2="240" y2="50" stroke={C.ink} strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <circle cx="160" cy="50" r="5" fill={C.ink} />
      {/* Linke Schale: Anforderungen */}
      <g className="ex-pan-l">
        <path d="M80 50 L54 112 M80 50 L106 112" stroke={C.soft} strokeWidth="1.3" fill="none" />
        <rect x="64" y="98" width="14" height="14" rx="2.5" fill={C.ink} />
        <rect x="82" y="98" width="14" height="14" rx="2.5" fill={C.ink} />
        <rect x="73" y="84" width="14" height="14" rx="2.5" fill={C.ink} opacity="0.75" />
        <path d="M50 112 H110 Q106 126 80 126 Q54 126 50 112 Z" fill={C.car1} stroke={C.car} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      {/* Rechte Schale: Möglichkeiten, zwei kommen dazu, dann steht die Waage gerade */}
      <g className="ex-pan-r">
        <path d="M240 50 L214 112 M240 50 L266 112" stroke={C.soft} strokeWidth="1.3" fill="none" />
        <circle cx="231" cy="104" r="7.5" fill={C.car} />
        <circle className="ex-fade" cx="249" cy="104" r="7.5" fill={C.car4} style={{ '--d': '0.9s' } as React.CSSProperties} />
        <circle className="ex-fade" cx="240" cy="90" r="7.5" fill={C.car4} style={{ '--d': '1.3s' } as React.CSSProperties} />
        <path d="M210 112 H270 Q266 126 240 126 Q214 126 210 112 Z" fill={C.car1} stroke={C.car} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      <Label x={80} y={170} d={0.2}>
        {l[0]}
      </Label>
      <Label x={160} y={30} d={0.6}>
        {l[1]}
      </Label>
      <Label x={240} y={170} d={1}>
        {l[2]}
      </Label>
    </>
  )
}

function Kette({ l }: { l: [string, string, string] }) {
  const knot = (x: number, d: number, children: React.ReactNode, big = false) => (
    <g className="ex-fade" style={{ '--d': `${d}s` } as React.CSSProperties}>
      {big && <circle className="ex-pulse" cx={x} cy="80" r="40" fill={C.car1} style={{ '--d': '1.8s' } as React.CSSProperties} />}
      <circle cx={x} cy="80" r={big ? 32 : 28} fill="#fff" stroke={big ? C.car : C.car4} strokeWidth={big ? 2.2 : 1.8} />
      <g transform={`translate(${x} 80)`} stroke={big ? C.car : C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </g>
  )
  return (
    <>
      <path d="M82 80 H126 M194 80 H238" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      <path className="ex-flow" pathLength={1} d="M82 80 H126 M194 80 H238" stroke={C.car} strokeWidth="2" strokeLinecap="round" />
      <path d="M120 74 L127 80 L120 86 M232 74 L239 80 L232 86" stroke={C.car} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {knot(54, 0.2, <path d="M2 -12 L-6 2 H2 L-2 12 L7 -3 H-1 Z" />)}
      {knot(
        160,
        0.7,
        <>
          <circle cx="-6" cy="0" r="4.5" />
          <path d="M3 -8 A 11 11 0 0 1 3 8 M9 -13 A 17 17 0 0 1 9 13" />
        </>,
        true
      )}
      {knot(266, 1.2, <path d="M-13 1 H-6 L-3 -7 L2 9 L5 1 H13" />)}
      <Label x={54} y={150} d={0.4}>
        {l[0]}
      </Label>
      <Label x={160} y={150} d={0.9}>
        {l[1]}
      </Label>
      <Label x={266} y={150} d={1.4}>
        {l[2]}
      </Label>
    </>
  )
}

function Welle({ l }: { l: [string, string, string] }) {
  return (
    <>
      <line x1="16" y1="130" x2="304" y2="130" stroke={C.line} strokeWidth="1.5" strokeDasharray="3 5" />
      <line x1="172" y1="26" x2="172" y2="146" stroke={C.line} strokeWidth="1" strokeDasharray="2 4" />
      <path
        className="ex-draw"
        pathLength={1}
        d="M16 130 C 34 130 38 58 56 58 C 74 58 78 130 96 130 C 112 130 116 78 132 78 C 148 78 152 130 172 130"
        fill="none"
        stroke={C.car}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        className="ex-draw"
        pathLength={1}
        style={{ '--d': '1.6s' } as React.CSSProperties}
        d="M172 130 C 188 130 190 66 206 66 C 222 66 224 92 238 92 C 252 92 256 60 272 60 C 286 60 292 80 304 76"
        fill="none"
        stroke={C.ink}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <Label x={56} y={44} d={0.5}>
        {l[0]}
      </Label>
      <Label x={96} y={152} d={1}>
        {l[1]}
      </Label>
      <Label x={304} y={44} anchor="end" d={2.4}>
        {l[2]}
      </Label>
    </>
  )
}

function Ebenen({ l }: { l: [string, string, string] }) {
  const ring = (cx: number, cy: number, d: number) => (
    <g className="ex-fade" style={{ '--d': `${d}s` } as React.CSSProperties}>
      <circle className="ex-breathe" cx={cx} cy={cy} r="46" fill={C.car2} fillOpacity="0.4" stroke={C.car} strokeWidth="1.8" style={{ '--d': `${d + 1.2}s` } as React.CSSProperties} />
    </g>
  )
  return (
    <>
      {ring(160, 122, 0.2)}
      {ring(128, 70, 0.55)}
      {ring(192, 70, 0.9)}
      <g className="ex-fade" style={{ '--d': '1.3s' } as React.CSSProperties}>
        <circle className="ex-pulse" cx="160" cy="88" r="9" fill={C.car4} fillOpacity="0.45" style={{ '--d': '1.8s' } as React.CSSProperties} />
        <circle cx="160" cy="88" r="4.5" fill={C.ink} />
      </g>
      <Label x={160} y={152} d={0.4}>
        {l[0]}
      </Label>
      <Label x={110} y={60} d={0.75}>
        {l[1]}
      </Label>
      <Label x={210} y={60} d={1.1}>
        {l[2]}
      </Label>
    </>
  )
}

function Saeulen({ l }: { l: [string, string, string] }) {
  const xs = [74, 160, 246]
  const icons = [
    <path key="a" d="M-6 -6 H6 M-6 0 H6 M-6 6 H2" />,
    <>
      <circle key="b1" cx="0" cy="-2" r="6" />
      <circle key="b2" cx="-6" cy="8" r="1.6" />
    </>,
    <path key="c" d="M-6 7 C -6 -3 1 -8 7 -8 C 7 -1 3 7 -6 7 Z M-6 7 L2 -1" />,
  ]
  return (
    <>
      <path className="ex-draw" pathLength={1} style={{ '--d': '1.4s' } as React.CSSProperties} d="M46 58 L160 24 L274 58 Z" fill="none" stroke={C.car} strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="42" y1="144" x2="278" y2="144" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" />
      {xs.map((x, i) => (
        <g key={x}>
          <rect className="ex-grow" x={x - 17} y="64" width="34" height="80" rx="4" fill={i === 1 ? C.car : C.car4} style={{ '--d': `${0.2 + i * 0.3}s` } as React.CSSProperties} />
          <g
            className="ex-fade"
            transform={`translate(${x} 92)`}
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ '--d': `${0.8 + i * 0.3}s` } as React.CSSProperties}
          >
            {icons[i]}
          </g>
          <Label x={x} y={166} d={0.5 + i * 0.3}>
            {l[i]}
          </Label>
        </g>
      ))}
    </>
  )
}

const SCENES = { puls: Puls, waage: Waage, kette: Kette, welle: Welle, ebenen: Ebenen, saeulen: Saeulen }

export function ExplainScene({ scene, labels, title, className }: { scene: SceneKey; labels: [string, string, string]; title: string; className?: string }) {
  const S = SCENES[scene]
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={`${title}: ${labels.join(', ')}`} className={cn('h-auto w-full overflow-visible', className)}>
      <S l={labels} />
    </svg>
  )
}
