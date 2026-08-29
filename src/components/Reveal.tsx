import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.classList.add('is-visible')
      return
    }

    const mark = () => node.classList.add('is-visible')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs) {
              window.setTimeout(mark, delayMs)
            } else {
              mark()
            }
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [delayMs])

  return (
    <div ref={ref} className={cn('reveal', className)}>
      {children}
    </div>
  )
}
