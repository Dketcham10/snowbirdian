import { cta } from '../content'
import { cn } from '../lib/cn'

type Props = {
  className?: string
  short?: boolean
  variant?: 'light' | 'dark'
}

export function PrimaryCta({ className, short = false, variant = 'light' }: Props) {
  const label = short ? cta.shortLabel : cta.label
  const isDark = variant === 'dark'

  return (
    <a
      href={cta.href}
      className={cn(
        'btn-primary inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-small font-medium tracking-wide transition-colors',
        isDark
          ? 'bg-cream text-ink hover:bg-cream-deep'
          : 'bg-ink text-cream hover:bg-ink-soft',
        className,
      )}
    >
      {label}
    </a>
  )
}
