import { whyPoints, whySection } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function WhyUs() {
  return (
    <section
      id={whySection.id}
      aria-labelledby="why-heading"
      className="bg-cream py-24 md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeading
          id="why-heading"
          eyebrow={whySection.eyebrow}
          title={whySection.title}
          lead={whySection.lead}
        />

        <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {whyPoints.map((point, index) => (
            <li key={point.name}>
              <Reveal delayMs={index * 70}>
                <p className="font-display text-xl text-bronze-dark">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-4 text-h3 text-ink">{point.name}</h3>
                <p className="mt-3 text-body text-ink-muted">{point.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
