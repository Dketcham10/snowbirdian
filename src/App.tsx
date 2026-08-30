import { Contact } from './components/Contact'
import { EntryPopup } from './components/EntryPopup'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Industries } from './components/Industries'
import { MidCta } from './components/MidCta'
import { Services } from './components/Services'
import { StickyCta } from './components/StickyCta'
import { WhyUs } from './components/WhyUs'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <MidCta />
        <Industries />
        <HowItWorks />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
      <EntryPopup />
    </>
  )
}
