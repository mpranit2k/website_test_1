import { z } from "zod";

export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  message: z.string().max(1000).optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
