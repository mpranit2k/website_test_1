"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #ffffff55 0, transparent 40%), radial-gradient(circle at 80% 80%, #F59E0B55 0, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent"
        >
          Plumbing Emergency? We respond fast.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
        >
          Burst Pipe, Dead Water Heater, or Clogged Drain? Gator Plumbing Fixes It Fast.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-white/80"
        >
          {BUSINESS.rating}★ from {BUSINESS.reviewCount} Google reviews · Licensed &
          insured · Family owned/operated
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a href={BUSINESS.phoneHref}>
            <Button variant="primary" size="lg">
              Call {BUSINESS.phone}
            </Button>
          </a>
          <a href="#quote">
            <Button variant="secondary" size="lg">
              Free Quote
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
