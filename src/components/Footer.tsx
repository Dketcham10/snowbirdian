import { nav, site } from '../content'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-24 pt-14 text-cream md:pb-12">
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-3">
            <img
              src={site.logo.src}
              alt=""
              width={28}
              height={28}
              loading="lazy"
              decoding="async"
              className="h-7 w-7 object-contain"
            />
            <span className="font-display text-lg text-cream">{site.name}</span>
          </a>
          <p className="mt-3 text-small text-cream/55">
            {site.location}
            <br />
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 hover:text-cream hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-eyebrow uppercase text-bronze-light">On this page</p>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center text-small text-cream/70 hover:text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {site.social.length > 0 ? (
          <nav aria-label="Social">
            <p className="text-eyebrow uppercase text-bronze-light">Follow</p>
            <ul className="mt-4 space-y-1">
              {site.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-small text-cream/70 hover:text-cream"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>

      <Container className="mt-12 border-t border-white/10 pt-6">
        <p className="text-[0.75rem] tracking-wide text-cream/40">
          © {site.year} {site.legalName}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
