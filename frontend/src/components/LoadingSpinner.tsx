// components/LoadingSpinner.tsx
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: number;
  className?: string; // for container styles (padding, margin, height)
  color?: string; // explicit color class if needed, otherwise defaults
}

export function LoadingSpinner({
  size = 8,
  className,
  color = "text-blue-600"
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={clsx(
        "flex items-center justify-center w-full h-full min-h-[200px]",
        className
      )}
    >
      <Loader2
        className={clsx("animate-spin", color)}
        style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
      />
    </div>
  );
}
