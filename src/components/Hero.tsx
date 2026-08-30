import { useEffect, useRef } from 'react'
import { cta, hero } from '../content'
import { BlueprintGrid, PavilionElevation } from './art/ArchitecturalMotifs'
import { Container } from './Container'
import { PrimaryCta } from './PrimaryCta'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    // Fine pointers only: a drifting grid is noise on touch, and the effect is
    // decorative enough to drop entirely when reduced motion is requested.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || still.matches) return

    let frame = 0

    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const box = node.getBoundingClientRect()
        const x = event.clientX - box.left
        const y = event.clientY - box.top
        node.style.setProperty('--px', `${x}px`)
        node.style.setProperty('--py', `${y}px`)
        node.style.setProperty('--pxr', `${x / box.width}`)
        node.style.setProperty('--pyr', `${y / box.height}`)
        node.style.setProperty('--pk', '1')
      })
    }

    const onLeave = () => node.style.setProperty('--pk', '0')

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-heading"
      className="pointer-field relative isolate overflow-hidden bg-ink text-cream"
    >
      <BlueprintGrid className="field-grid pointer-events-none absolute inset-0 h-full w-full text-bronze-light/[0.07]" />
      <div
        className="field-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(196,168,130,0.12),transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(20,17,14,0.4),transparent_45%)]"
        aria-hidden="true"
      />

      <Container className="relative grid min-h-[100svh] grid-cols-1 items-center gap-12 pb-24 pt-28 md:pb-28 md:pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="text-eyebrow uppercase text-bronze-light">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="font-display mt-5 max-w-[18ch] text-display text-cream"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-measure text-body text-cream/72">{hero.subhead}</p>
          <div className="mt-10 flex flex-col items-start gap-4 md:flex-row md:items-center">
            <PrimaryCta variant="dark" />
            <a
              href={cta.secondaryHref}
              className="inline-flex min-h-11 items-center text-small text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              {cta.secondaryLabel}
            </a>
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
          <PavilionElevation className="h-[28rem] w-auto text-bronze-light/55 xl:h-[32rem]" />
        </div>
      </Container>
    </section>
  )
}
