"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/Toaster";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  serviceType: z.string().min(1, "Select a service"),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

const SERVICE_OPTIONS = [
  "Water Heater Install & Repair",
  "Drain Cleaning",
  "Backflow Testing",
  "Slab Leak Detection",
  "Sewer Camera",
  "Remodeling / Repairs",
  "Garbage Disposal",
  "Reverse Osmosis",
  "Other",
];

const TOAST_MESSAGES = {
  success: "Thanks! Your request is in — we'll call you back shortly.",
  error: "Something went wrong. Please try again or call (956) 761-2620.",
};

const inputClass =
  "w-full rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 font-body text-white placeholder:text-white/50 transition-colors duration-200 focus:border-accent focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-accent";

const labelClass =
  "mb-1 block font-heading text-sm font-bold text-white";

const errorClass = "mt-1 text-sm font-body text-red-300";

export function QuoteForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: QuoteFormValues) => {
    // TODO(Stage 6): wire to API
    void values;
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast(TOAST_MESSAGES.success);
  };

  return (
    <form
      id="quote-form"
      aria-label="Free quote request form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-card border border-white/15 bg-white/5 p-5 shadow-card sm:p-6 md:mx-auto md:max-w-md md:w-full"
    >
      <h3 className="mb-4 font-heading text-xl font-extrabold text-white">
        Get Your Free Quote
      </h3>

      <div className="mb-4">
        <label htmlFor="quote-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="quote-name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p id="quote-name-error" className={errorClass}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="quote-phone" className={labelClass}>
          Phone
        </label>
        <input
          id="quote-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "quote-phone-error" : undefined}
          className={inputClass}
          {...register("phone")}
        />
        {errors.phone && (
          <p id="quote-phone-error" className={errorClass}>
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="quote-service" className={labelClass}>
          Service Needed
        </label>
        <select
          id="quote-service"
          aria-invalid={!!errors.serviceType}
          aria-describedby={errors.serviceType ? "quote-service-error" : undefined}
          className={inputClass}
          {...register("serviceType")}
        >
          <option value="" className="text-neutral-800">
            Select a service
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="text-neutral-800">
              {opt}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p id="quote-service-error" className={errorClass}>
            {errors.serviceType.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="quote-message" className={labelClass}>
          Describe the Problem
        </label>
        <textarea
          id="quote-message"
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "quote-message-error" : undefined}
          className={inputClass}
          {...register("message")}
        />
        {errors.message && (
          <p id="quote-message-error" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-accent-dark px-7 py-3.5 font-heading text-lg font-bold text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-accent-darker active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-colors"
      >
        {isSubmitting && (
          <svg
            aria-hidden
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {isSubmitting ? "Sending..." : "Get My Free Quote"}
      </button>
    </form>
  );
}
