import * as React from "react";
import { cn } from "../../lib/utils";

export function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-1 text-red-700", className)} {...props} />;
} 