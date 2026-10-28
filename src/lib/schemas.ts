import { z } from "zod";
import { todayISO } from "@/lib/format";

const phonePattern = /^\+?[0-9\s()-]{7,20}$/;
const phoneMessage = "Please enter a valid phone number.";

const name = z.string().trim().min(2, "Please enter your name.");
const email = z.email("Please enter a valid email address.");

export const newsletterSchema = z.object({ email });

export const contactSchema = z.object({
  name,
  email,
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || phonePattern.test(value), phoneMessage),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters."),
});

export const bookingSchema = z
  .object({
    name,
    email,
    phone: z.string().trim().regex(phonePattern, phoneMessage),
    from: z.string().min(1, "Please choose a departure airport."),
    to: z.string().min(1, "Please choose a destination airport."),
    date: z
      .string()
      .min(1, "Please choose a travel date.")
      .refine((value) => value >= todayISO(), "Please choose a future date."),
    passengers: z.string().min(1, "Please choose the number of passengers."),
  })
  .refine((values) => values.from === "" || values.from !== values.to, {
    path: ["to"],
    message: "Destination must be different from departure.",
  });

export type NewsletterValues = z.infer<typeof newsletterSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
export type BookingValues = z.infer<typeof bookingSchema>;
