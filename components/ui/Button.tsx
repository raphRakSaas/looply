import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-lg px-4 font-medium outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80 focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[var(--looply-accent)] text-white shadow-sm hover:bg-[var(--looply-accent-hover)] hover:shadow-md focus:ring-[var(--looply-accent)]",
    secondary:
      "border border-[var(--looply-border)] bg-white text-[var(--looply-text)] hover:bg-gray-50 focus:ring-[var(--looply-accent)]",
    ghost:
      "text-[var(--looply-text-muted)] hover:bg-gray-100 focus:ring-[var(--looply-accent)]",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span
          className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
          style={{ animation: "looply-spinner 0.7s linear infinite" }}
        />
      ) : (
        children
      )}
    </button>
  );
}
