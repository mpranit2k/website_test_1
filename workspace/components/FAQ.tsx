"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const FAQ_ITEMS = [
  {
    question: "How fast can you respond to a plumbing emergency?",
    answer:
      "We treat urgent plumbing problems as a priority and do our best to get to you quickly. Response times vary by job and location — call (956) 761-2620 for the fastest help.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Gator Plumbing is licensed, insured, and family owned and operated.",
  },
  {
    question: "Are you available nights and weekends?",
    answer:
      "We're open Monday through Friday, 7am–6pm. Saturdays are emergency-only and we're closed Sundays. For urgent issues, call us and we'll let you know how we can help.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Los Fresnos, South Padre Island, Port Isabel, and Laguna Vista.",
  },
  {
    question: "What's included in a free quote?",
    answer:
      "Get in touch and we'll discuss your project and put together an honest quote based on what the job involves. Every job is different, so we'll walk you through the details before starting.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section ref={sectionRef} aria-labelledby="faq-heading" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="mb-8 px-4 text-center font-heading text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl md:mb-10 md:text-4xl"
        >
          Frequently Asked Questions
        </h2>
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-trigger-${i}`;
          return (
            <div
              key={buttonId}
              className={cn(
                "mb-3 overflow-hidden rounded-card border bg-white transition-colors",
                open ? "border-brand/30" : "border-neutral-200",
              )}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex min-h-[48px] w-full items-center justify-between gap-4 px-4 py-3.5 text-left font-heading text-base font-bold text-brand-dark sm:px-5 sm:py-4"
                >
                  {item.question}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "h-5 w-5 shrink-0 text-accent transition-transform duration-200 ease-out",
                      open && "rotate-180",
                    )}
                  />
                </button>
              </h3>
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 font-body text-sm text-neutral-600 sm:px-5 md:text-base">
                  {item.answer}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
