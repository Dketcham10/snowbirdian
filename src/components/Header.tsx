import { useEffect, useState } from 'react'
import { cta, nav, site } from '../content'
import { cn } from '../lib/cn'
import { Container } from './Container'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.1 },
    )

    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-white/10 bg-ink/92 backdrop-blur-md'
          : 'border-transparent bg-ink/70 backdrop-blur-sm',
      )}
    >
      <Container className="flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]">
        <a href="#top" className="flex min-h-11 items-center gap-3 text-cream">
          <img
            src={site.logo.src}
            alt={site.logo.alt}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="font-display text-lg tracking-tight text-cream md:text-[1.35rem]">
            {site.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors',
                active === item.id ? 'text-cream' : 'text-cream/60 hover:text-cream',
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="btn-nav inline-flex min-h-11 items-center border border-bronze-light/50 px-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-bronze-light hover:bg-white/5"
          >
            {cta.shortLabel}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-full bg-cream transition-transform',
                open && 'translate-y-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1.5 h-px w-full bg-cream transition-opacity',
                open && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-3 h-px w-full bg-cream transition-transform',
                open && '-translate-y-1.5 -rotate-45',
              )}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-ink lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex min-h-11 items-center text-small uppercase tracking-[0.16em] text-cream/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={cta.href}
              className="mt-2 flex min-h-11 items-center justify-center bg-cream text-small font-medium text-ink"
              onClick={() => setOpen(false)}
            >
              {cta.shortLabel}
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
