import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium"
          style={{ color: "var(--looply-text)" }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-[15px] outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--looply-accent)] focus:ring-offset-0 focus:shadow-[0_0_0_3px_rgba(79,70,229,0.15)] disabled:opacity-60 ${className}`}
        style={{
          borderColor: error ? "#EF4444" : "var(--looply-border)",
          color: "var(--looply-text)",
        }}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-red-500"
          style={{ animation: "looply-card-enter 200ms ease-out" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
