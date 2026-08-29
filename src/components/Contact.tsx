import { contactSection, site } from '../content'
import { Container } from './Container'
import { HubSpotForm } from './HubSpotForm'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  return (
    <section
      id={contactSection.id}
      aria-labelledby="contact-heading"
      className="bg-ink py-24 text-cream md:py-28 lg:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              invert
              id="contact-heading"
              eyebrow={contactSection.eyebrow}
              title={contactSection.title}
              lead={contactSection.lead}
            />
            <Reveal>
              <div className="mt-10 space-y-3 text-small">
                <p>
                  <span className="block text-eyebrow uppercase text-bronze-light">
                    Email
                  </span>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 inline-flex min-h-11 items-center text-cream underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
                {site.phone ? (
                  <p>
                    <span className="block text-eyebrow uppercase text-bronze-light">
                      Phone
                    </span>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, '')}`}
                      className="mt-2 inline-flex min-h-11 items-center text-cream underline-offset-4 hover:underline"
                    >
                      {site.phone}
                    </a>
                  </p>
                ) : null}
                <p className="pt-4 text-cream/50">{contactSection.confidential}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <HubSpotForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
