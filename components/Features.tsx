"use client";

import { useRef } from "react";
import {
  Siren,
  Flame,
  Waves,
  ShieldCheck,
  Hammer,
  ScanSearch,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SERVICE_ICONS = [
  Siren,
  Flame,
  Waves,
  ShieldCheck,
  Hammer,
  ScanSearch,
];

export function Features() {
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!gridRef.current) return;
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <section
      aria-labelledby="features-heading"
      className="bg-neutral-50 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          className="mb-8 text-center font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl md:mb-12 md:text-4xl"
        >
          Plumbing Services Done Right
        </h2>
        <ul
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <li key={service.title}>
                <Card
                  title={service.title}
                  description={service.description}
                  href="#quote-form"
                  linkLabel={`Request a ${service.title} quote`}
                  icon={<Icon aria-hidden className="h-7 w-7" />}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
