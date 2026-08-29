import { industries, industriesSection } from '../content'
import { PlatLines } from './art/ArchitecturalMotifs'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Industries() {
  return (
    <section
      id={industriesSection.id}
      aria-labelledby="industries-heading"
      className="relative overflow-hidden bg-cream py-24 md:py-28 lg:py-32"
    >
      <PlatLines className="pointer-events-none absolute -right-8 top-16 w-56 text-bronze/15 md:w-72" />
      <Container className="relative">
        <SectionHeading
          id="industries-heading"
          eyebrow={industriesSection.eyebrow}
          title={industriesSection.title}
          lead={industriesSection.lead}
        />

        <ul className="mt-16 divide-y divide-cream-dark border-y border-cream-dark">
          {industries.map((industry, index) => (
            <li key={industry.name}>
              <Reveal delayMs={index * 40}>
                <div className="grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9">
                  <p className="font-display text-lg text-bronze-dark md:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-h3 text-ink md:col-span-4">
                    {industry.name}
                  </h3>
                  <p className="text-body text-ink-muted md:col-span-7">{industry.line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
