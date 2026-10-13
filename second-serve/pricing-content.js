/* Snowbirdian Hospitality plans. Edit copy and flags here.
   Fees stay hidden while SHOW_FEES is false. */
window.PRICING = {
  SHOW_FEES: false,
  SHOW_FOUNDING_OFFER: true,
  FOUNDING_OWNER_SPOTS: 5,
  FOUNDING_RATE_LOCK: "2 years",
  NOTICE_PERIOD: "60 days",
  phoneDisplay: "480-881-0332",
  phoneTel: "4808810332",
  email: "dillon@snowbirdian.com",
  fees: {
    "co-hosting": "18% of nightly rent",
    "full-service": "25% of nightly rent",
    "all-inclusive": "30% of total bookings",
  },
  hubspot: {
    /* This portal is in HubSpot's na2 region. api.hsforms.com accepts it; api-na1.hsforms.com does not. */
    portalId: "244446007",
    formId: "16fbd8df-d8c8-4709-b2b7-bb5a79aa7946",
    tracking: false,
    fields: {
      firstname: "firstname",
      lastname: "lastname",
      email: "email",
      phone: "phone",
      property_address: "property_address",
      bedrooms_sleeps: "bedrooms_sleeps",
      plan_of_interest: "plan_of_interest",
      listing_status: "listing_status",
      start_timeline: "start_timeline",
      lead_source_detail: "lead_source_detail",
      partner_type: "partner_type",
      investment_range: "investment_range",
      preferred_structure: "preferred_structure",
      message: "message",
    },
  },
  plans: [
    { id: "co-hosting", label: "Co-Hosting" },
    { id: "full-service", label: "Full-Service" },
    { id: "all-inclusive", label: "All-Inclusive" },
    { id: "home-watch", label: "Home Watch" },
    { id: "partnership", label: "Partnership" },
    { id: "not-sure", label: "Not sure yet" },
  ],
  listingStatus: [
    "Yes, on Airbnb",
    "Yes, on Vrbo",
    "Yes, on both",
    "Not yet",
  ],
  startTimeline: [
    "As soon as possible",
    "Within 3 months",
    "Before next season",
    "Just exploring",
  ],
  hearAbout: [
    "Referral",
    "Tennis or club community",
    "Search",
    "Social media",
    "Other",
  ],
  partnerType: [
    "An owner with a property",
    "Looking to buy a property",
    "An investor",
  ],
  investmentRange: [
    "Under $250K",
    "$250K–$500K",
    "$500K–$1M",
    "$1M+",
    "Prefer not to say",
  ],
  preferredStructure: [
    "Profit share",
    "Base + performance",
    "Equity partnership",
    "Not sure yet",
  ],
  /* we = included, you = stays with the owner, addon = extra charge */
  compareGroups: [
    {
      label: "Listing and pricing",
      rows: [
        ["Listing setup and professional photos", "addon", "we", "we"],
        ["Dynamic nightly pricing", "we", "we", "we"],
        ["Calendar management", "we", "we", "we"],
      ],
    },
    {
      label: "Guest experience",
      rows: [
        ["Guest messaging", "we", "we", "we"],
        ["Check-in support and guest issues", "you", "we", "we"],
        ["Review management", "we", "we", "we"],
      ],
    },
    {
      label: "Property operations",
      rows: [
        ["Cleaning and turnover coordination", "we", "we", "we"],
        ["Supplies and restocking", "addon", "we", "we"],
        ["Inspections between stays", "addon", "we", "we"],
        ["Maintenance coordination", "you", "we", "we"],
        ["Local on-site response", "addon", "we", "we"],
      ],
    },
    {
      label: "Financial",
      rows: [
        ["Monthly owner statement", "we", "we", "we"],
        ["Tax license setup and filings", "you", "we", "we"],
      ],
    },
    {
      label: "Concierge and consulting",
      rows: [
        ["Guest concierge and experiences", "addon", "addon", "we"],
        ["Owner consulting and upgrade planning", "addon", "addon", "we"],
      ],
    },
  ],
}
