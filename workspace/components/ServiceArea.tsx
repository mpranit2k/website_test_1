"use client";

import { useRef } from "react";
import Image from "next/image";
import { MapPin, Navigation } from "lucide-react";
import { SERVICE_AREA, BUSINESS } from "@/lib/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ServiceArea() {
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
    <section ref={sectionRef} aria-labelledby="service-area-heading" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2
        id="service-area-heading"
        className="text-center font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl md:text-4xl"
      >
        Proudly Serving the Rio Grande Valley
      </h2>
      <p className="mx-auto mt-3 max-w-xl px-4 text-center font-body text-base text-neutral-600 md:mt-4 md:text-lg">
        Family-owned plumbing serving Los Fresnos and the surrounding coastal area.
      </p>
      <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mt-10">
        {SERVICE_AREA.map((city) => (
          <li
            key={city}
            className="flex min-h-[44px] items-center gap-3 rounded-card border border-neutral-200 bg-white px-4 py-3.5 font-heading font-semibold text-brand-dark shadow-card sm:px-5 sm:py-4"
          >
            <MapPin aria-hidden className="h-5 w-5 shrink-0 text-accent" />
            {city}
          </li>
        ))}
      </ul>
      <div className="mt-10 px-4 text-center md:mt-12">
        <a
          href={BUSINESS.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Gator Plumbing location in Google Maps"
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 font-heading font-bold text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:w-auto"
        >
          <Navigation aria-hidden className="h-5 w-5" />
          View Us on Google Maps
        </a>
      </div>
        <Image
          src="/images/service-area.jpg"
          alt="Plumbing technician toolkit"
          width={6960}
          height={4640}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="mt-10 mx-auto hidden max-w-3xl rounded-card border border-neutral-200 shadow-card lg:block"
        />
      </div>
    </section>
  );
}
