import { useId, type ReactNode } from "react";

interface FieldControlProps {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  /** Receives the props that tie the control to its label and error. */
  children: (control: FieldControlProps) => ReactNode;
}

export const fieldControlClasses =
  "block w-full border border-phthalo-green-2 bg-phthalo-green-3 px-[20px] py-[15px] text-white [color-scheme:dark] placeholder:text-morning-blue focus:border-satin-sheen-gold aria-invalid:border-error";

export function Field({ label, error, className, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-[8px] block font-semibold text-white">
        {label}
      </label>

      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}

      <p id={errorId} role="alert" className="mt-[6px] text-fs-8 text-error">
        {error}
      </p>
    </div>
  );
}
