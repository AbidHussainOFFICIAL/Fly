"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClasses } from "@/components/ui/Button";
import { Field, fieldControlClasses } from "@/components/ui/Field";
import { simulateSubmit } from "@/lib/demo";
import { contactSchema, type ContactValues } from "@/lib/schemas";

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async () => {
    await simulateSubmit();
    reset();
    setIsSent(true);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setIsSent(false)}
      className="grid gap-[20px] md:grid-cols-2"
    >
      <Field label="Name" error={errors.name?.message}>
        {(control) => (
          <input
            type="text"
            autoComplete="name"
            className={fieldControlClasses}
            {...control}
            {...register("name")}
          />
        )}
      </Field>

      <Field label="Email" error={errors.email?.message}>
        {(control) => (
          <input
            type="email"
            autoComplete="email"
            className={fieldControlClasses}
            {...control}
            {...register("email")}
          />
        )}
      </Field>

      <Field
        label="Phone (optional)"
        error={errors.phone?.message}
        className="md:col-span-2"
      >
        {(control) => (
          <input
            type="tel"
            autoComplete="tel"
            className={fieldControlClasses}
            {...control}
            {...register("phone")}
          />
        )}
      </Field>

      <Field
        label="Message"
        error={errors.message?.message}
        className="md:col-span-2"
      >
        {(control) => (
          <textarea
            rows={6}
            className={fieldControlClasses}
            {...control}
            {...register("message")}
          />
        )}
      </Field>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses("primary", "disabled:opacity-70")}
        >
          Send Message
        </button>

        <p role="status" className="mt-[15px] font-semibold text-white">
          {isSent ? "Thank you! We will reply to you shortly." : ""}
        </p>
      </div>
    </form>
  );
}
