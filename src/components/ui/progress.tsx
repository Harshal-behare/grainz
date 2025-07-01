import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div className={`w-full h-3 bg-gray-200 rounded-full overflow-hidden ${className}`.trim()}>
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
} 