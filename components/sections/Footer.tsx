"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/schemas";
import { submitQuote } from "@/lib/api";
import { useToast } from "@/components/ui/Toaster";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: QuoteFormValues) {
    setSubmitting(true);
    try {
      await submitQuote(values);
      toast("Quote request sent! We'll call you shortly.");
      reset();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-brand-dark text-white" id="quote">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-3xl font-extrabold">Get Your Free Quote</h2>
          <p className="mb-6 text-white/70">
            Tell us what you need. We'll get back to you fast.
          </p>
          <address className="not-italic">
            <p className="mb-2">{BUSINESS.legalName} DBA {BUSINESS.dba}</p>
            <p className="mb-2">{BUSINESS.address}</p>
            <p className="mb-2">
              <a href={BUSINESS.phoneHref} className="hover:text-accent">
                {BUSINESS.phone}
              </a>
            </p>
            <p className="mb-4">{BUSINESS.hours}</p>
            <a
              href={BUSINESS.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-accent px-5 py-2.5 font-bold text-white transition-colors hover:bg-accent-dark"
            >
              View on Google Maps
            </a>
          </address>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-accent"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone")}
              type="tel"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-accent"
              placeholder="(956) 555-0123"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-300">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold">
              Email <span className="text-white/50">(optional)</span>
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-accent"
              placeholder="you@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="service" className="mb-1 block text-sm font-semibold">
              Service Needed
            </label>
            <select
              id="service"
              {...register("service")}
              className="w-full rounded-lg border border-white/20 bg-brand-dark px-4 py-2.5 text-white outline-none focus:border-accent"
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-300">{errors.service.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold">
              Details <span className="text-white/50">(optional)</span>
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={3}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none focus:border-accent"
              placeholder="Describe the problem"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-300">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={submitting} disabled={submitting} className="w-full">
            {submitting ? "Sending..." : "Request Free Quote"}
          </Button>
        </form>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} {BUSINESS.legalName} DBA {BUSINESS.dba}. Licensed &
        insured. All rights reserved.
      </div>
    </footer>
  );
}
