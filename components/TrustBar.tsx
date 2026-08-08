"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, BadgeCheck, Home, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    key: "rating",
    label: `${BUSINESS.rating}★ · ${BUSINESS.reviewCount} Google Reviews`,
    Icon: Star,
    iconClass: "bg-accent-50 text-accent-600",
  },
  {
    key: "licensed",
    label: "Licensed & Insured",
    Icon: BadgeCheck,
    iconClass: "bg-water-50 text-water-600",
  },
  {
    key: "family",
    label: "Family Owned & Operated",
    Icon: Home,
    iconClass: "bg-brand-50 text-brand-700",
  },
  {
    key: "hours",
    label: `Hours: ${BUSINESS.hours}`,
    Icon: Clock,
    iconClass: "bg-neutral-100 text-neutral-600",
  },
];

export function TrustBar() {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-label="Trust signals"
      aria-live="polite"
      className="border-y border-neutral-200 bg-white"
    >
      <motion.ul
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-7 sm:px-6 md:flex md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-12 md:gap-y-5 md:py-9 lg:px-8"
        initial={prefersReducedMotion ? false : "hidden"}
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.075 },
          },
        }}
      >
        {BADGES.map(({ key, label, Icon, iconClass }) => (
          <motion.li
            key={key}
            variants={itemVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex min-h-[44px] items-center justify-center gap-3 px-2 text-center font-heading text-sm font-semibold text-neutral-700 md:justify-start md:text-left"
          >
            <span
              className={cn(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-black/5",
                iconClass,
              )}
            >
              <Icon aria-hidden className="h-5 w-5" />
            </span>
            {label}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
