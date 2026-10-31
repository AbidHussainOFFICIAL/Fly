"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClasses } from "@/components/ui/Button";
import { Field, fieldControlClasses } from "@/components/ui/Field";
import { airports } from "@/data/airports";
import { flights } from "@/data/flights";
import { simulateSubmit } from "@/lib/demo";
import { bookingSchema, type BookingValues } from "@/lib/schemas";

const passengerOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1),
);

const emptyValues: BookingValues = {
  name: "",
  email: "",
  phone: "",
  from: "",
  to: "",
  date: "",
  passengers: "",
};

export function BookingForm() {
  const searchParams = useSearchParams();
  const flight = flights.find(
    (item) => item.slug === searchParams.get("flight"),
  );
  const departure =
    airports.find((airport) => airport.code === searchParams.get("from"))
      ?.code ?? "";
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: flight
      ? {
          ...emptyValues,
          from: flight.from,
          to: flight.to,
          date: flight.date,
          passengers: String(flight.passengers),
        }
      : { ...emptyValues, from: departure },
  });

  const onSubmit = async () => {
    await simulateSubmit();
    reset(emptyValues);
    setIsSent(true);
  };

  const airportOptions = (placeholder: string) => (
    <>
      <option value="">{placeholder}</option>
      {airports.map(({ code, city, name }) => (
        <option key={code} value={code}>
          {city} ({code}) - {name}
        </option>
      ))}
    </>
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setIsSent(false)}
      className="grid gap-[20px] md:grid-cols-2"
    >
      <Field label="From" error={errors.from?.message}>
        {(control) => (
          <select
            className={fieldControlClasses}
            {...control}
            {...register("from")}
          >
            {airportOptions("Select departure airport")}
          </select>
        )}
      </Field>

      <Field label="To" error={errors.to?.message}>
        {(control) => (
          <select
            className={fieldControlClasses}
            {...control}
            {...register("to")}
          >
            {airportOptions("Select destination airport")}
          </select>
        )}
      </Field>

      <Field label="Travel date" error={errors.date?.message}>
        {(control) => (
          <input
            type="date"
            className={fieldControlClasses}
            {...control}
            {...register("date")}
          />
        )}
      </Field>

      <Field label="Passengers" error={errors.passengers?.message}>
        {(control) => (
          <select
            className={fieldControlClasses}
            {...control}
            {...register("passengers")}
          >
            <option value="">Select passengers</option>
            {passengerOptions.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        )}
      </Field>

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

      <Field label="Phone" error={errors.phone?.message}>
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

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses("primary", "disabled:opacity-70")}
        >
          Request Booking
        </button>

        <p role="status" className="mt-[15px] font-semibold text-white">
          {isSent
            ? "Thank you! We have received your request and will contact you shortly with a quote."
            : ""}
        </p>
      </div>
    </form>
  );
}
