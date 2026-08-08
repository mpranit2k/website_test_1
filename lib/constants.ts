export const BUSINESS = {
  legalName: "Buche Plumbing LLC",
  dba: "Gator Plumbing",
  rating: 4.8,
  reviewCount: 157,
  address: "41786 FM 510, Los Fresnos, TX 78566",
  phone: "(956) 761-2620",
  phoneHref: "tel:+19567612620",
  hours: "Mon-Fri 7am-6pm, Sat emergency only, Sun closed",
  tagline: "Licensed & insured | Family owned/operated",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Gator%20Plumbing&query_place_id=ChIJ__8j3SKsb4YRVnJIwzV0JhE",
} as const;

export const SERVICES = [
  {
    title: "Emergency Repair",
    description:
      "Sudden leaks, breaks, or failures. We're a licensed, family-owned shop ready to help when plumbing goes wrong.",
  },
  {
    title: "Water Heater Install & Repair",
    description:
      "Installation and repair for residential water heaters — new units or bringing an existing one back to life.",
  },
  {
    title: "Drain Cleaning",
    description:
      "Slow or clogged drains cleared and flushed so water flows freely again.",
  },
  {
    title: "Backflow Testing",
    description:
      "Professional backflow testing to help keep your water supply protected and compliant.",
  },
  {
    title: "Remodeling",
    description:
      "Plumbing work for kitchens, baths, and remodels — rough-in to finish, done to code.",
  },
  {
    title: "Slab Leak Detection",
    description:
      "Careful detection and repair of leaks under the slab to limit damage to your home.",
  },
] as const;

export const SERVICE_AREA = [
  "Los Fresnos",
  "South Padre Island",
  "Port Isabel",
  "Laguna Vista",
] as const;

export const FAQS = [
  {
    question: "How fast can you respond to an emergency?",
    answer:
      "We prioritize urgent calls. Give us a ring and we'll get a technician dispatched as soon as possible.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Gator Plumbing is fully licensed, insured, and family owned/operated.",
  },
  {
    question: "Are you available nights and weekends?",
    answer:
      "We take emergency calls on Saturday; Sunday is closed. Call (956) 761-2620 for urgent needs.",
  },
] as const;
