/**
 * All site copy lives here. Edit this file — not components — to change wording.
 * Placeholder fields that must be replaced before launch are marked TODO.
 */

export const site = {
  name: 'SnowBirdian AI',
  legalName: 'SnowBirdian AI',
  url: 'https://www.snowbirdian.com',
  locale: 'en_US',
  location: 'Scottsdale, Arizona',
  year: 2026,
  email: 'dillon@snowbirdian.com',
  /** TODO: add a public phone number before launch. Leave empty to omit from the UI. */
  phone: '' as string,
  /** TODO: add social URLs when accounts exist. Empty entries are omitted from the footer. */
  social: [] as { label: string; href: string }[],
  logo: {
    src: '/brand/logo-mark.png',
    srcLight: '/brand/logo-mark.png',
    alt: 'SnowBirdian AI mark — a stylized phoenix',
    og: '/og-image.png',
    favicon: '/favicon.png',
  },
}

export const seo = {
  title: 'SnowBirdian AI | Automation for Real Estate & Lending',
  description:
    'Workflow automation and AI agents for real estate, construction, investment, insurance, and mortgage firms. Request a confidential automation assessment.',
  keywords: [
    'AI automation for commercial real estate',
    'workflow automation for mortgage lenders',
    'AI agents for real estate investment firms',
    'lease abstraction automation',
    'construction draw request automation',
    'insurance claims document parsing',
  ],
} as const

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'industries', label: 'Industries' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const

export const cta = {
  label: 'Request a Confidential Automation Assessment',
  shortLabel: 'Request an Assessment',
  href: '#contact',
  secondaryLabel: 'See how it works',
  secondaryHref: '#how-it-works',
} as const

export const hero = {
  eyebrow: 'Boutique automation for deal-driven firms',
  headline:
    'We automate the busywork slowing down your deals, draws, and closings — so your team can focus on the ones that matter.',
  subhead:
    'Workflow automation and AI agents built for real estate, construction, investment, and lending firms that can’t afford a deal stalling because a document sat in an inbox.',
} as const

export type ServiceCard = {
  id: string
  name: string
  summary: string
  examples: string[]
  audiences: string[]
}

export const services: ServiceCard[] = [
  {
    id: 'workflow-systems',
    name: 'Workflow & Systems Integration',
    summary:
      'We connect the systems your deals run through so nothing gets lost between the broker, the lender, the title company, and the investor.',
    examples: [
      'Syncing your MLS, CRM, and transaction platform (dotloop, SkySlope, Follow Up Boss) end to end',
      'Automatic transaction-coordination checklists that never drop a step',
      'Connecting construction project tools (Procore, Buildertrend) with accounting',
      'Investor-portal updates pulled automatically from property management systems',
    ],
    audiences: [
      'Residential real estate',
      'Commercial real estate',
      'Construction',
      'Real estate investment',
    ],
  },
  {
    id: 'custom-ai-agents',
    name: 'Custom AI Agents',
    summary:
      'AI that handles routine buyer, tenant, borrower, and investor questions around the clock.',
    examples: [
      '24/7 qualification for high-value listing inquiries',
      'A leasing and showing scheduling assistant',
      'A mortgage pre-qualification and application-status chatbot',
      'An “ask the portfolio” agent for investors and asset managers',
      'An insurance claims intake and status agent',
    ],
    audiences: [
      'Residential real estate',
      'Insurance',
      'Mortgage lending',
      'Real estate investment',
    ],
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing Automation',
    summary:
      'Automated follow-up so a seven-figure listing or a commercial lease inquiry never sits unanswered.',
    examples: [
      'Instant lead response for high-value listings',
      'Automated investor nurture sequences',
      'Commission and referral tracking',
      'Drip campaigns for pre-construction or pre-development buyers',
    ],
    audiences: [
      'Residential real estate',
      'Commercial real estate',
      'Construction',
      'Real estate investment',
    ],
  },
  {
    id: 'data-documents',
    name: 'Data & Document Processing',
    summary:
      'Turning contracts, loan files, and permits into clean, usable data automatically.',
    examples: [
      'Lease abstraction — renewal options, rent escalations, expense recovery — in hours instead of weeks',
      'Closing document and contract extraction',
      'Mortgage document processing (pay stubs, tax returns, bank statements) with underwriting file assembly',
      'Insurance claims document parsing',
      'Investor reporting and NOI rollups',
      'Construction draw requests and permit paperwork',
    ],
    audiences: [
      'Commercial real estate',
      'Construction',
      'Insurance',
      'Mortgage lending',
      'Real estate investment',
    ],
  },
]

export const partnership = {
  name: 'Ongoing Support & Optimization',
  summary:
    'Lending guidelines change, new listing platforms roll out, and portfolios grow — we keep your systems current.',
  details:
    'A partnership plan, not a fifth product. Monthly monitoring, fixes, and new automations added as the business changes — so the system you launch is the system you still trust a year later.',
}

export const servicesSection = {
  id: 'services',
  eyebrow: 'What we build',
  title: 'Four capabilities, one outcome: deals that keep moving.',
  lead: 'We design around the platforms your operators already live in. No rip-and-replace. No generic chatbot dropped on a brochure site.',
} as const

export const midCta = {
  line: 'If a document, a follow-up, or a status update is where deals stall — that is the work we take off your team.',
} as const

export type Industry = {
  name: string
  line: string
}

export const industriesSection = {
  id: 'industries',
  eyebrow: 'Who we serve',
  title: 'Built for the industries where a stall is expensive.',
  lead: 'This is not a horizontal tech shop learning your world on your dime. These are the businesses we build for.',
} as const

export const industries: Industry[] = [
  {
    name: 'Residential & Luxury Real Estate',
    line: 'High-value listing inquiries answered instantly; transaction coordination that never drops a step.',
  },
  {
    name: 'Commercial Real Estate',
    line: 'Lease abstraction, underwriting support, portfolio monitoring with threshold alerts.',
  },
  {
    name: 'Construction & Development',
    line: 'Draw requests, permit tracking, subcontractor and project document workflows.',
  },
  {
    name: 'Real Estate Investment Firms & Family Offices',
    line: 'Investor reporting, NOI rollups, IC memo assembly, portfolio alerts.',
  },
  {
    name: 'Insurance (Property, Title & Casualty)',
    line: 'Claims intake, document parsing, status automation.',
  },
  {
    name: 'Mortgage & Lending',
    line: 'Document extraction, underwriting file assembly, borrower status updates, compliance-aware workflows.',
  },
  {
    name: 'Other high-end, deal-driven businesses',
    line: 'If your business runs on documents, deadlines, and high-value relationships, ask us.',
  },
]

export const processSection = {
  id: 'how-it-works',
  eyebrow: 'How it works',
  title: 'A short, fixed-scope path into deal-critical systems.',
  lead: 'We treat access to your stack as a privilege. Scope is written down before anyone touches a live workflow.',
} as const

export const processSteps = [
  {
    number: '01',
    name: 'Assessment',
    text: 'A confidential conversation about where deals stall — systems, handoffs, and the documents that sit too long. You leave with a written scope, not a pitch deck.',
  },
  {
    number: '02',
    name: 'Build',
    text: 'We implement around the tools you already run: MLS, CRM, transaction platforms, project management, servicing, and accounting. Your operators stay in their seats.',
  },
  {
    number: '03',
    name: 'Launch',
    text: 'Tested against real files, documented for the people who will use it, and handed over with a walkthrough — not a login and a wish.',
  },
  {
    number: '04',
    name: 'Support',
    text: 'Optional monthly partnership: monitoring, fixes, and new automations as guidelines, platforms, and volume change.',
  },
] as const

export const whySection = {
  id: 'why',
  eyebrow: `Why ${site.name}`,
  title: 'Industry fluency first. Software second.',
  lead: 'The firms we work with do not need another vendor. They need someone who already understands why a draw package, a lease abstract, or a loan file cannot wait.',
} as const

export const whyPoints = [
  {
    name: 'We build around the tools your industry already runs on',
    text: 'dotloop, SkySlope, Follow Up Boss, Procore, Buildertrend, Encompass, Salesforce, and the property-management stack — connected, not replaced.',
  },
  {
    name: 'Fixed-scope pricing, no lock-in',
    text: 'You approve a written scope and a number before work starts. Ongoing support is optional. You are never trapped in a platform you do not own.',
  },
  {
    name: 'Direct access to the person doing the work',
    text: 'Not a support queue, not a junior bench rotating off your account. You work with the person designing and shipping the automation.',
  },
] as const

export type FaqItem = {
  question: string
  answer: string
}

export const faqSection = {
  id: 'faq',
  eyebrow: 'Questions',
  title: 'What operators usually ask before they let anyone near a live deal file.',
} as const

export const faqs: FaqItem[] = [
  {
    question:
      'Can this integrate with the tools we already use — our MLS, dotloop/SkySlope, Procore, Encompass, Salesforce, or property management software?',
    answer:
      'Yes. We design around the systems your deals already run through. Typical work includes MLS and CRM connections, transaction platforms such as dotloop and SkySlope, construction tools such as Procore and Buildertrend, origination systems such as Encompass, Salesforce, and property-management software. If a system has an API, an export, or a structured inbox, we can usually work with it. We do not ask you to rip and replace a stack your team already trusts.',
  },
  {
    question: 'How do you handle sensitive financial and client data?',
    answer:
      'We build around your existing data-security and compliance requirements — including considerations such as KYC/AML, RESPA, and fair housing — in partnership with your legal and compliance counsel. Access is limited to what the workflow needs, and we follow the controls you already use for vendors touching client and financial files. Automation does not itself guarantee regulatory compliance; it is designed to operate inside the policies you and your counsel define.',
  },
  {
    question: 'How long does this take?',
    answer:
      'The assessment is a single conversation plus a written scope. Most first automations launch in two to six weeks, depending on system access, file complexity, and how many handoffs we are connecting. Larger document-processing or multi-system builds are scoped on their own timeline before we start.',
  },
  {
    question: 'What does this cost?',
    answer:
      'Engagements are fixed-scope and quoted after the assessment — so you know the number before anyone writes a line of automation. There is no required retainer to begin and no lock-in contract. Ongoing monitoring and new work sit on a separate monthly plan if you want it.',
  },
  {
    question: 'Do we need in-house technical staff?',
    answer:
      'No. We work with brokers, transaction coordinators, project managers, processors, and principals. If you have IT or a fractional CTO, we coordinate with them on access and security. Your team does not need to write or maintain the automation.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'You receive documentation, a walkthrough with the people who will use the system, and a clear owner on our side. After that, you can stop — the automation is yours — or continue on a monthly partnership for monitoring, fixes, and new automations as lending guidelines, listing platforms, and portfolio volume change.',
  },
]

export const contactSection = {
  id: 'contact',
  eyebrow: 'Start a conversation',
  title: 'Request a confidential automation assessment.',
  lead: 'Tell us who you are and how the firm is organized. We will reply personally — no sequence, no SDR queue.',
  confidential: 'All inquiries are treated as confidential.',
} as const

/** Existing SnowBirdian HubSpot portal. Update field labels in HubSpot — this form still has the old Holdings questions. */
export const hubspot = {
  portalId: '244446007',
  formId: '14cf639b-d609-41c6-a7fb-c05d195a87b4',
  region: 'na2',
} as const
