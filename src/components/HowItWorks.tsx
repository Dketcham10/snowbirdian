import { processSection, processSteps } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function HowItWorks() {
  return (
    <section
      id={processSection.id}
      aria-labelledby="process-heading"
      className="bg-ink py-24 text-cream md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeading
          invert
          id="process-heading"
          eyebrow={processSection.eyebrow}
          title={processSection.title}
          lead={processSection.lead}
        />

        <ol className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.name} className="relative">
              <Reveal delayMs={index * 80} className="h-full">
                <article className="h-full border-t border-bronze-light/35 pt-6">
                  <p className="font-display text-3xl text-bronze-light">{step.number}</p>
                  <h3 className="font-display mt-4 text-h3 text-cream">{step.name}</h3>
                  <p className="mt-3 text-small text-cream/68">{step.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
