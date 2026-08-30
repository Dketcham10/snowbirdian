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

/** Modernist pavilion elevation — columns, plinth, window bay. */
const pavilion: Shape[] = [
  { t: 'line', x1: 28, y1: 420, x2: 332, y2: 420 },
  { t: 'line', x1: 40, y1: 420, x2: 40, y2: 408 },
  { t: 'line', x1: 320, y1: 420, x2: 320, y2: 408 },
  { t: 'rect', x: 48, y: 392, w: 264, h: 16 },
  { t: 'line', x1: 56, y1: 392, x2: 56, y2: 148 },
  { t: 'line', x1: 304, y1: 392, x2: 304, y2: 148 },
  { t: 'rect', x: 48, y: 132, w: 264, h: 16 },
  { t: 'line', x1: 40, y1: 132, x2: 180, y2: 72 },
  { t: 'line', x1: 320, y1: 132, x2: 180, y2: 72 },
  { t: 'line', x1: 56, y1: 140, x2: 180, y2: 86 },
  { t: 'line', x1: 304, y1: 140, x2: 180, y2: 86 },
  { t: 'rect', x: 168, y: 64, w: 24, h: 10 },
  { t: 'rect', x: 88, y: 188, w: 72, h: 168 },
  { t: 'line', x1: 124, y1: 188, x2: 124, y2: 356 },
  { t: 'line', x1: 88, y1: 244, x2: 160, y2: 244 },
  { t: 'line', x1: 88, y1: 300, x2: 160, y2: 300 },
  { t: 'rect', x: 200, y: 188, w: 72, h: 168 },
  { t: 'line', x1: 236, y1: 188, x2: 236, y2: 356 },
  { t: 'line', x1: 200, y1: 244, x2: 272, y2: 244 },
  { t: 'line', x1: 200, y1: 300, x2: 272, y2: 300 },
  { t: 'line', x1: 172, y1: 200, x2: 188, y2: 200 },
  { t: 'line', x1: 172, y1: 356, x2: 188, y2: 356 },
]

export function PavilionElevation({ className }: MotifProps) {
  const ref = useInView<SVGSVGElement>()

  return (
    <svg
      ref={ref}
      className={cn('draw-in', className)}
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Line drawing of a modernist pavilion elevation"
    >
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="square">
        {pavilion.map((shape, i) => (
          <Stroke key={i} shape={shape} index={i} />
        ))}
        <rect
          x="20"
          y="430"
          width="320"
          height="1.1"
          fill="currentColor"
          stroke="none"
          data-draw-fade=""
          style={{ '--i': pavilion.length } as CSSProperties}
        />
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
