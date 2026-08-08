"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function StickyCallBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Quick call"
      initial={prefersReducedMotion ? false : { y: 64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/20 bg-brand-dark px-4 py-3 shadow-card md:hidden"
    >
      <a
        href={BUSINESS.phoneHref}
        aria-label="Call Gator Plumbing now"
        className="flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-accent-dark font-heading text-lg font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-darker active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transform-none motion-reduce:transition-colors"
      >
        <Phone aria-hidden className="h-5 w-5" />
        Call Now
      </a>
    </motion.nav>
  );
}
