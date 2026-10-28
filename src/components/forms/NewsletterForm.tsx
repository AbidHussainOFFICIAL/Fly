"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAirplane } from "react-icons/io5";
import { buttonClasses } from "@/components/ui/Button";
import { simulateSubmit } from "@/lib/demo";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";

const messageClasses =
  "absolute top-full left-0 mt-[12px] text-fs-8 text-phthalo-green-1 md:mt-0";

export function NewsletterForm() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const errorId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async () => {
    await simulateSubmit();
    reset();
    setIsSubscribed(true);
  };

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setIsSubscribed(false)}
        className="md:relative"
      >
        <input
          type="email"
          placeholder="Enter email address"
          aria-label="Email address"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? errorId : undefined}
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

      <p id={errorId} role="alert" className={messageClasses}>
        {errors.email?.message}
      </p>

      <p role="status" className={messageClasses}>
        {isSubscribed ? "Thanks for subscribing!" : ""}
      </p>
    </div>
  );
}
