import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", loading, disabled, children, ...props }, ref) => {
    const base =
      "font-semibold py-2 px-4 rounded-lg shadow transition disabled:opacity-50 flex items-center justify-center";
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700 text-white",
      outline: "bg-white border border-gray-200 hover:bg-blue-50 text-gray-700",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-t-2 border-blue-500 rounded-full"></span> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button"; 