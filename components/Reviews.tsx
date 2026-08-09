"use client";

import { useRef } from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} aria-labelledby="reviews-heading" className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-5 inline-flex items-center gap-1 text-accent">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} aria-hidden className="h-6 w-6 fill-accent" />
          ))}
        </div>
        <h2
          id="reviews-heading"
          className="font-heading text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl md:text-5xl"
        >
          Trusted by Neighbors Across the Valley
        </h2>
        <p className="mt-4 font-body text-base text-neutral-600 md:mt-5 md:text-lg">
          Rated {BUSINESS.rating}★ from {BUSINESS.reviewCount} Google reviews.
        </p>
        <a
          href={BUSINESS.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read Gator Plumbing reviews on Google Maps"
          className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 font-heading font-bold text-white shadow-glow-accent transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:mt-10 md:w-auto"
        >
          <MessageSquareQuote aria-hidden className="h-5 w-5" />
          Read Our Google Reviews
        </a>
      </div>
    </section>
  );
}
