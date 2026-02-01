"use client";

import { useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("space-y-4 [&>legend]:sr-only", className)}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      className={cn(
        variant === "label" && "text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      data-slot="field"
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      className={cn("flex w-full items-center gap-3", className)}
      {...props}
    >
      <Separator />
      {children && (
        <span className="text-muted-foreground text-xs">{children}</span>
      )}
      <Separator />
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];
    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message;
    return (
      <ul className="list-disc space-y-1 pl-4">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <p
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {content}
    </p>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
};
