import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export function Hero() {
  return (
    <header
      aria-labelledby="hero-heading"
      className="relative bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Gator Plumbing service vehicle in a Los Fresnos, TX neighborhood"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-10"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="mb-4 inline-block rounded-pill bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent">
          Plumbing Emergency? Help Is a Phone Call Away
        </p>
        <h1
          id="hero-heading"
          className="max-w-3xl font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Burst Pipe, No Hot Water, or Stubborn Clog? Gator Plumbing Fixes It Fast.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-base text-white/80 md:text-lg">
          Rated {BUSINESS.rating}★ by {BUSINESS.reviewCount} Google reviews · Licensed
          & insured · Family owned & operated · Serving Los Fresnos, South Padre Island,
          Port Isabel & Laguna Vista
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:gap-4 md:mt-10 md:flex-row md:items-center">
          <a
            href={BUSINESS.phoneHref}
            aria-label="Call Gator Plumbing now"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-accent-dark px-8 py-4 font-heading text-lg font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-darker active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transform-none motion-reduce:transition-colors"
          >
            Call {BUSINESS.phone}
          </a>
          <a
            href="#quote-form"
            aria-label="Request a free quote from Gator Plumbing"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-white/70 bg-transparent px-8 py-4 font-heading text-lg font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-white hover:text-brand-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transform-none motion-reduce:transition-colors"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
