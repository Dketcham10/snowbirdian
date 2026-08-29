import { midCta } from '../content'
import { Container } from './Container'
import { PrimaryCta } from './PrimaryCta'
import { Reveal } from './Reveal'

export function MidCta() {
  return (
    <section aria-label="Request an assessment" className="bg-cream-deep py-20 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-h2 text-ink">{midCta.line}</p>
          <div className="mt-8">
            <PrimaryCta />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
