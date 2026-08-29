import { useEffect, useState } from 'react'
import { cta } from '../content'

export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const contact = document.getElementById('contact')
    if (!hero) return

    const nodes = [hero, contact].filter((el): el is HTMLElement => Boolean(el))
    const state = { pastHero: false, inContact: false }

    const sync = () => setVisible(state.pastHero && !state.inContact)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'top') state.pastHero = !entry.isIntersecting
          if (entry.target.id === 'contact') state.inContact = entry.isIntersecting
        })
        sync()
      },
      { threshold: 0.12 },
    )

    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={cta.href}
        className="flex min-h-11 w-full items-center justify-center bg-cream px-4 text-center text-small font-medium text-ink"
      >
        {cta.shortLabel}
      </a>
    </div>
  )
}
