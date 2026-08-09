"use client";

import Image from "next/image";
import { useRef } from "react";
import { BUSINESS } from "@/lib/constants";
import { gsap, useGSAP } from "@/lib/gsap";

const DROPLETS = [
  { size: 64, top: "12%", right: "14%", duration: 7, delay: 0 },
  { size: 40, top: "26%", right: "6%", duration: 5.5, delay: 0.8 },
  { size: 28, top: "8%", right: "26%", duration: 6.5, delay: 1.6 },
];

function Droplet({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient
          id={`drop-${size}`}
          x1="12"
          y1="2"
          x2="12"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#A5EEFC" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22C9EF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M12 2c0 0 8 9.5 8 16a8 8 0 1 1-16 0c0-6.5 8-16 8-16Z"
        fill={`url(#drop-${size})`}
        stroke="#67E0F9"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <ellipse
        cx="8.75"
        cy="19.5"
        rx="2"
        ry="3.4"
        fill="#ECFCFF"
        opacity="0.55"
        transform="rotate(-18 8.75 19.5)"
      />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const floating = gsap.utils.toArray<HTMLElement>(".hero-droplet");

        floating.forEach((el, i) => {
          const config = DROPLETS[i];
          gsap.fromTo(
            el,
            { y: 0, opacity: 0.9 },
            {
              y: -34,
              opacity: 0.55,
              duration: config.duration,
              delay: config.delay,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              transformOrigin: "50% 50%",
            },
          );
          gsap.fromTo(
            el,
            { rotate: -8 },
            {
              rotate: 10,
              duration: config.duration * 0.6,
              delay: config.delay,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            },
          );
        });

        gsap.fromTo(
          ".hero-ripple",
          { scale: 0.6, opacity: 0.7 },
          {
            scale: 2.4,
            opacity: 0,
            duration: 4.5,
            ease: "power1.out",
            repeat: -1,
          },
        );
      });
      return () => mm.revert();
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-brand-950 text-white"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Gator Plumbing service vehicle in a Los Fresnos, TX neighborhood"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />

      <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/55 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <p className="mb-5 inline-flex items-center gap-2 rounded-pill bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent-200 ring-1 ring-inset ring-accent/30">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Plumbing Emergency? Help Is a Phone Call Away
        </p>
        <h1
          id="hero-heading"
          className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Burst Pipe, No Hot Water, or Stubborn Clog? Gator Plumbing Fixes It
          Fast.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-base text-white/80 md:text-lg">
          Rated {BUSINESS.rating}★ by {BUSINESS.reviewCount} Google reviews ·
          Licensed & insured · Family owned & operated · Serving Los Fresnos,
          South Padre Island, Port Isabel & Laguna Vista
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:gap-4 md:mt-11 md:flex-row md:items-center">
          <a
            href={BUSINESS.phoneHref}
            aria-label="Call Gator Plumbing now"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-9 py-4 font-heading text-lg font-bold text-white shadow-glow-accent transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-accent-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 motion-reduce:transform-none motion-reduce:transition-colors"
          >
            Call {BUSINESS.phone}
          </a>
          <a
            href="#quote-form"
            aria-label="Request a free quote from Gator Plumbing"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-white/70 bg-white/5 px-9 py-4 font-heading text-lg font-bold text-white backdrop-blur-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-white hover:text-brand-950 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 motion-reduce:transform-none motion-reduce:transition-colors"
          >
            Get a Free Quote
          </a>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        aria-hidden
      >
        {DROPLETS.map((d, i) => (
          <span
            key={i}
            className="hero-droplet absolute block"
            style={{ top: d.top, right: d.right }}
          >
            <Droplet size={d.size} />
          </span>
        ))}
        <span
          className="hero-ripple absolute block"
          style={{ top: "22%", right: "8%" }}
        >
          <span className="block h-16 w-16 rounded-full border-2 border-water-200/60" />
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-950/70 to-transparent"
        aria-hidden
      />
    </header>
  );
}
