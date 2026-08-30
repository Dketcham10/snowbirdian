import { partnership, services, servicesSection } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Services() {
  return (
    <section
      id={servicesSection.id}
      aria-labelledby="services-heading"
      className="bg-cream py-24 md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          lead={servicesSection.lead}
        />

        <ol className="mt-16 grid grid-cols-1 gap-px bg-cream-dark md:grid-cols-2">
          {services.map((service, index) => (
            <li key={service.id} className="bg-cream">
              <Reveal delayMs={index * 60} className="h-full">
                <article className="trace flex h-full flex-col px-6 py-10 md:px-10 md:py-12">
                  <p className="font-display text-xl text-bronze-dark">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-4 text-h3 text-ink">{service.name}</h3>
                  <p className="mt-3 text-body text-ink-muted">{service.summary}</p>
                  <ul className="mt-6 space-y-2.5 text-small text-ink-soft">
                    {service.examples.map((example) => (
                      <li key={example} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-4 shrink-0 bg-bronze"
                        />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-px bg-ink text-cream">
          <div className="grid gap-8 px-6 py-12 md:grid-cols-12 md:items-end md:px-10 md:py-14">
            <div className="md:col-span-8">
              <p className="text-eyebrow uppercase text-bronze-light">How we work with you</p>
              <h3 className="font-display mt-4 text-h3 text-cream">{partnership.name}</h3>
              <p className="mt-3 max-w-measure text-body text-cream/72">
                {partnership.summary} {partnership.details}
              </p>
            </div>
            <p className="font-display text-2xl text-bronze-light md:col-span-4 md:text-right">
              Partnership, not a product.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
