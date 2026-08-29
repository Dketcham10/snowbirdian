import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  invert = false,
  align = 'left',
}: {
  id?: string
  eyebrow: string
  title: ReactNode
  lead?: string
  invert?: boolean
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl')}>
      <p
        className={cn(
          'font-sans text-eyebrow uppercase',
          invert ? 'text-bronze-light' : 'text-bronze-dark',
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'font-display mt-4 text-h2',
          invert ? 'text-cream' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            'mt-5 max-w-measure text-body',
            invert ? 'text-cream/72' : 'text-ink-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
