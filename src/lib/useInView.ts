import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` to the element the first time it enters the viewport, so
 * CSS owns the animation. Elements resolve to their finished state immediately
 * when the visitor prefers reduced motion.
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const mark = () => node.classList.add('is-visible')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      mark()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mark()
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  return ref
}
