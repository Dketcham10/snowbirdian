import { useState } from 'react'
import { faqs, faqSection } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id={faqSection.id}
      aria-labelledby="faq-heading"
      className="bg-cream-deep py-24 md:py-28 lg:py-32"
    >
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow={faqSection.eyebrow}
          title={faqSection.title}
        />

        <div className="mt-14 divide-y divide-cream-dark border-y border-cream-dark">
          {faqs.map((item, index) => {
            const isOpen = open === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`
            return (
              <Reveal key={item.question} delayMs={index * 30}>
                <div>
                  <h3 className="font-display text-h3">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex min-h-11 w-full items-start justify-between gap-6 py-6 text-left text-ink"
                      onClick={() => setOpen(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 font-sans text-lg text-bronze-dark"
                      >
                        {isOpen ? '–' : '+'}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-6"
                  >
                    <p className="max-w-3xl text-body text-ink-muted">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
