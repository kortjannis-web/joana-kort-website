import './trust-scene.css'

/**
 * Kleine Motion-Designs in den Kacheln der Vertrauensleiste (TrustBar), je 3 s. TrustBar steuert je Karte `run` (läuft gerade)
 * und `leaving` (blendet nach dem Wechsel aus). Ruhezustand mit JS = leer, damit jede Szene weich hereinstartet.
 * Ohne JS bzw. bei "Bewegung reduzieren" steht das fertige Bild. Linien in currentColor (weiß auf der aktiven Apricot-Kachel),
 * Espresso als zweite Farbe. Nur transform/opacity und stroke-dashoffset (pathLength 1).
 */
export const TRUST_SCENES = ['studium', 'individuell', 'ort', 'zeit'] as const
export type TrustSceneId = (typeof TRUST_SCENES)[number]

const ESPRESSO = '#2a211b'

export function TrustScene({ id, run = false, leaving = false }: { id: TrustSceneId; run?: boolean; leaving?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className="tbs block h-[4.5rem] w-[4.5rem] overflow-visible"
      data-run={run}
      data-leaving={leaving}
      role="presentation"
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {id === 'studium' && <Studium />}
      {id === 'individuell' && <Individuell />}
      {id === 'ort' && <Ort />}
      {id === 'zeit' && <Zeit />}
    </svg>
  )
}

/* 1 Gesundheitspsychologie: aufgeschlagenes Buch zeichnet sich, darüber läuft eine Pulslinie */
function Studium() {
  return (
    <g strokeWidth="2.4">
      <path className="ts-draw" style={{ '--t': '0s' } as React.CSSProperties} pathLength={1} stroke="currentColor" d="M40 30 C33 25 22 24 13 26 V58 C22 56 33 57 40 62 C47 57 58 56 67 58 V26 C58 24 47 25 40 30 Z" />
      <path className="ts-draw" style={{ '--t': '0.45s' } as React.CSSProperties} pathLength={1} stroke="currentColor" d="M40 30 V62" />
      <path className="ts-draw" style={{ '--t': '0.9s' } as React.CSSProperties} pathLength={1} stroke={ESPRESSO} strokeWidth="2.6" d="M6 18 H22 L26 10 L31 25 L35 15 L38 18 H74" />
    </g>
  )
}

/* 2 Individuell statt Schema F: die Markenlinie verknotet sich und läuft ruhig aus, der Punkt ploppt */
function Individuell() {
  return (
    <g>
      <path
        className="ts-draw"
        style={{ '--t': '0.1s', '--dur': '1.7s' } as React.CSSProperties}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="2.6"
        d="M6 56 C13 56 17 31 30 30 C42 29 45 46 35 48 C25 50 25 25 41 24 C57 23 55 49 67 51 C70 51.6 72 51.4 73 51.4"
      />
      <circle className="ts-pop" style={{ '--t': '1.65s' } as React.CSSProperties} cx="75.5" cy="51.4" r="3" fill={ESPRESSO} />
    </g>
  )
}

/* 3 Online und vor Ort: Laptop zeichnet sich, darüber ploppt eine Standort-Nadel */
function Ort() {
  return (
    <g strokeWidth="2.4">
      <path className="ts-draw" style={{ '--t': '0s' } as React.CSSProperties} pathLength={1} stroke="currentColor" d="M18 58 V36 C18 34.3 19.3 33 21 33 H59 C60.7 33 62 34.3 62 36 V58" />
      <path className="ts-draw" style={{ '--t': '0.5s' } as React.CSSProperties} pathLength={1} stroke="currentColor" d="M10 58 H70 L66 63 H14 Z" />
      <g className="ts-pin" style={{ '--t': '1.05s' } as React.CSSProperties}>
        <path stroke={ESPRESSO} strokeWidth="2.6" fill="none" d="M40 49 C40 49 30 39.5 30 32.5 C30 26.7 34.5 22 40 22 C45.5 22 50 26.7 50 32.5 C50 39.5 40 49 40 49 Z" />
        <circle cx="40" cy="32.5" r="3.6" fill={ESPRESSO} />
      </g>
    </g>
  )
}

/* 4 15 Minuten kostenlos: Uhr zeichnet sich, ein Viertel füllt sich, der Zeiger läuft mit */
function Zeit() {
  return (
    <g strokeWidth="2.4">
      <circle className="ts-draw" style={{ '--t': '0s' } as React.CSSProperties} pathLength={1} cx="40" cy="42" r="24" stroke="currentColor" transform="rotate(-90 40 42)" />
      <path className="ts-fill" style={{ '--t': '0.75s' } as React.CSSProperties} d="M40 42 V18 A24 24 0 0 1 64 42 Z" fill={ESPRESSO} opacity="0.16" />
      <path stroke="currentColor" d="M40 12 V8 M36 8 H44" />
      <g className="ts-hand" style={{ '--t': '0.75s' } as React.CSSProperties}>
        <path stroke={ESPRESSO} strokeWidth="2.8" d="M40 42 V24" />
      </g>
      <circle cx="40" cy="42" r="2.6" fill={ESPRESSO} />
    </g>
  )
}
