/** Sparse architectural line art — property and structure, not stock buildings. */

type MotifProps = {
  className?: string
}

export function BlueprintGrid({ className }: MotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: 25 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
        ))}
      </g>
    </svg>
  )
}

/** Modernist pavilion elevation — columns, plinth, window bay. */
export function PavilionElevation({ className }: MotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Line drawing of a modernist pavilion elevation"
    >
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="square">
        <line x1="28" y1="420" x2="332" y2="420" />
        <line x1="40" y1="420" x2="40" y2="408" />
        <line x1="320" y1="420" x2="320" y2="408" />
        <rect x="48" y="392" width="264" height="16" />
        <line x1="56" y1="392" x2="56" y2="148" />
        <line x1="304" y1="392" x2="304" y2="148" />
        <rect x="48" y="132" width="264" height="16" />
        <line x1="40" y1="132" x2="180" y2="72" />
        <line x1="320" y1="132" x2="180" y2="72" />
        <line x1="56" y1="140" x2="180" y2="86" />
        <line x1="304" y1="140" x2="180" y2="86" />
        <rect x="168" y="64" width="24" height="10" />
        <rect x="88" y="188" width="72" height="168" />
        <line x1="124" y1="188" x2="124" y2="356" />
        <line x1="88" y1="244" x2="160" y2="244" />
        <line x1="88" y1="300" x2="160" y2="300" />
        <rect x="200" y="188" width="72" height="168" />
        <line x1="236" y1="188" x2="236" y2="356" />
        <line x1="200" y1="244" x2="272" y2="244" />
        <line x1="200" y1="300" x2="272" y2="300" />
        <line x1="172" y1="200" x2="188" y2="200" />
        <line x1="172" y1="356" x2="188" y2="356" />
        <rect x="20" y="430" width="320" height="1.1" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

/** Abstract lot / plat geometry. */
export function PlatLines({ className }: MotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <rect x="8" y="12" width="264" height="136" />
        <line x1="8" y1="56" x2="272" y2="56" />
        <line x1="96" y1="12" x2="96" y2="148" />
        <line x1="184" y1="56" x2="184" y2="148" />
        <line x1="8" y1="108" x2="184" y2="108" />
        <circle cx="96" cy="56" r="3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}
