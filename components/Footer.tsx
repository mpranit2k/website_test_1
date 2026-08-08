import dynamic from "next/dynamic";
import { MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const QuoteForm = dynamic(() =>
  import("@/components/QuoteForm").then((m) => m.QuoteForm),
);

export function Footer() {
  return (
    <footer
      aria-label="Contact and company information"
      className="bg-brand-dark text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:px-8">
        <address className="not-italic">
          <h2 className="mb-4 font-heading text-2xl font-extrabold text-white">
            {BUSINESS.dba}
          </h2>
          <p className="mb-2 font-body text-neutral-300">{BUSINESS.legalName}</p>
          <p className="mb-2 font-body text-neutral-300">{BUSINESS.tagline}</p>
          <p className="mb-3 flex items-start gap-2 font-body text-white">
            <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-accent" />
            {BUSINESS.address}
          </p>
          <p className="mb-3">
            <a
              href={BUSINESS.phoneHref}
              aria-label="Call Gator Plumbing at (956) 761-2620"
              className="inline-flex items-center gap-2 font-heading text-lg font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:text-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transform-none motion-reduce:transition-colors"
            >
              <Phone aria-hidden className="h-5 w-5 text-accent" />
              {BUSINESS.phone}
            </a>
          </p>
          <p className="mb-4 font-body text-neutral-300">{BUSINESS.hours}</p>
          <a
            href={BUSINESS.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Gator Plumbing location in Google Maps"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-5 py-2.5 font-heading font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-white hover:text-brand-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transform-none motion-reduce:transition-colors"
          >
            <MapPin aria-hidden className="h-5 w-5" />
            View on Google Maps
          </a>
        </address>
        <div>
          <QuoteForm />
        </div>
      </div>
      <div className="border-t border-white/10 py-6 pb-24 text-center font-body text-sm text-neutral-300 md:pb-6">
        © {new Date().getFullYear()} {BUSINESS.legalName} DBA {BUSINESS.dba}. All
        rights reserved.
      </div>
    </footer>
  );
}
