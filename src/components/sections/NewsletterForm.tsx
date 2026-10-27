"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAirplane } from "react-icons/io5";
import { buttonClasses } from "@/components/ui/Button";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";

type Status = "idle" | "success" | "error";

const statusMessages: Record<Exclude<Status, "idle">, string> = {
  success: "Thanks for subscribing!",
  error: "Something went wrong. Please try again.",
};

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (values: NewsletterValues) => {
    setStatus("idle");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Subscription failed");

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const message =
    errors.email?.message ??
    (status === "idle" ? null : statusMessages[status]);

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="md:relative"
      >
        <input
          type="email"
          placeholder="Enter email address"
          aria-label="Email address"
          aria-invalid={errors.email ? true : undefined}
          className="mb-[20px] rounded-pill bg-white p-[23px] ps-[40px] text-black outline-none placeholder:text-[#757575]"
          {...register("email")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses(
            "newsletter",
            "disabled:opacity-70 md:absolute md:top-[10px] md:right-[10px] md:bottom-[10px]",
          )}
        >
          Subscribe
          <IoAirplane aria-hidden="true" />
        </button>
      </form>

      {message && (
        <p
          role="status"
          className="absolute top-full left-0 mt-[12px] text-fs-8 text-white md:mt-0"
        >
          {message}
        </p>
      )}
    </div>
  );
}
