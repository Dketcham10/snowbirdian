import type { CSSProperties } from 'react'
import { cn } from '../../lib/cn'
import { useInView } from '../../lib/useInView'

/**
 * Sparse architectural line art — property and structure, not stock buildings.
 *
 * Shapes are declared as data so each stroke can carry its own draw-in delay.
 * `pathLength={1}` normalises every shape regardless of its real perimeter, so
 * a single dash animation in index.css draws them all at a uniform rate.
 * Order matters: shapes are listed the way a drafter would build them up.
 */

type MotifProps = {
  className?: string
}

type Shape =
  | { t: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { t: 'rect'; x: number; y: number; w: number; h: number }
  | { t: 'circle'; cx: number; cy: number; r: number }
  | { t: 'poly'; points: string }

function Stroke({ shape, index }: { shape: Shape; index: number }) {
  const props = {
    'data-draw': '',
    pathLength: 1,
    style: { '--i': index } as CSSProperties,
  }

  if (shape.t === 'line') {
    return <line x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} {...props} />
  }
  if (shape.t === 'rect') {
    return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} {...props} />
  }
  if (shape.t === 'poly') {
    return <polygon points={shape.points} {...props} />
  }
  return <circle cx={shape.cx} cy={shape.cy} r={shape.r} {...props} />
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

/**
 * Systems schematic for the hero — source modules feeding a central agent,
 * then out to downstream systems. Drafted like an instrument, not a building.
 */
const schematic: Shape[] = [
  { t: 'line', x1: 32, y1: 36, x2: 52, y2: 36 },
  { t: 'line', x1: 32, y1: 36, x2: 32, y2: 56 },
  { t: 'line', x1: 328, y1: 36, x2: 308, y2: 36 },
  { t: 'line', x1: 328, y1: 36, x2: 328, y2: 56 },
  { t: 'rect', x: 56, y: 72, w: 80, h: 48 },
  { t: 'line', x1: 66, y1: 88, x2: 126, y2: 88 },
  { t: 'line', x1: 66, y1: 100, x2: 114, y2: 100 },
  { t: 'rect', x: 224, y: 88, w: 80, h: 48 },
  { t: 'line', x1: 234, y1: 104, x2: 294, y2: 104 },
  { t: 'line', x1: 234, y1: 116, x2: 278, y2: 116 },
  { t: 'line', x1: 136, y1: 96, x2: 180, y2: 96 },
  { t: 'line', x1: 224, y1: 112, x2: 180, y2: 112 },
  { t: 'line', x1: 180, y1: 96, x2: 180, y2: 194 },
  {
    t: 'poly',
    points: '180,194 211,212 211,248 180,266 149,248 149,212',
  },
  {
    t: 'poly',
    points: '180,214 194,222 194,238 180,246 166,238 166,222',
  },
  { t: 'line', x1: 180, y1: 220, x2: 180, y2: 240 },
  { t: 'line', x1: 170, y1: 230, x2: 190, y2: 230 },
  { t: 'line', x1: 180, y1: 266, x2: 180, y2: 372 },
  { t: 'rect', x: 56, y: 300, w: 80, h: 48 },
  { t: 'line', x1: 66, y1: 316, x2: 126, y2: 316 },
  { t: 'line', x1: 66, y1: 328, x2: 110, y2: 328 },
  { t: 'line', x1: 136, y1: 324, x2: 180, y2: 324 },
  { t: 'rect', x: 224, y: 316, w: 80, h: 48 },
  { t: 'line', x1: 234, y1: 332, x2: 294, y2: 332 },
  { t: 'line', x1: 234, y1: 344, x2: 274, y2: 344 },
  { t: 'line', x1: 224, y1: 340, x2: 180, y2: 340 },
  { t: 'rect', x: 140, y: 372, w: 80, h: 36 },
  { t: 'line', x1: 150, y1: 386, x2: 210, y2: 386 },
  { t: 'line', x1: 32, y1: 424, x2: 52, y2: 424 },
  { t: 'line', x1: 32, y1: 424, x2: 32, y2: 404 },
  { t: 'line', x1: 328, y1: 424, x2: 308, y2: 424 },
  { t: 'line', x1: 328, y1: 424, x2: 328, y2: 404 },
]

const schematicNodes = [
  { cx: 180, cy: 96 },
  { cx: 180, cy: 230 },
  { cx: 180, cy: 324 },
  { cx: 180, cy: 340 },
] as const

export function SystemSchematic({ className }: MotifProps) {
  const ref = useInView<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      className={cn('draw-in', className)}
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Line drawing of connected systems feeding a central automation node"
    >
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="square">
        {schematic.map((shape, i) => (
          <Stroke key={i} shape={shape} index={i} />
        ))}
        <path
          className="schematic-packet"
          d="M96 96 H180 V372"
          pathLength={1}
        />
        {schematicNodes.map((node, i) => (
          <circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="currentColor"
            stroke="none"
            data-draw-fade=""
            style={{ '--i': schematic.length + i } as CSSProperties}
          />
        ))}
      </g>
    </svg>
  )
}

/** Abstract lot / plat geometry. */
const plat: Shape[] = [
  { t: 'rect', x: 8, y: 12, w: 264, h: 136 },
  { t: 'line', x1: 8, y1: 56, x2: 272, y2: 56 },
  { t: 'line', x1: 96, y1: 12, x2: 96, y2: 148 },
  { t: 'line', x1: 184, y1: 56, x2: 184, y2: 148 },
  { t: 'line', x1: 8, y1: 108, x2: 184, y2: 108 },
]

export function PlatLines({ className }: MotifProps) {
  const ref = useInView<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      className={cn('draw-in', className)}
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        {plat.map((shape, i) => (
          <Stroke key={i} shape={shape} index={i} />
        ))}
        <circle
          cx="96"
          cy="56"
          r="3"
          fill="currentColor"
          stroke="none"
          data-draw-fade=""
          style={{ '--i': plat.length } as CSSProperties}
        />
      </g>
    </svg>
  )
}
