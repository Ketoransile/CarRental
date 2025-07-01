// components/LoadingSpinner.tsx
import { Loader2 } from "lucide-react"; // comes with shadcn/ui or `npm i lucide-react`
import clsx from "clsx"; // optional helper for class merging

interface LoadingSpinnerProps {
  size?: number;

  className?: string;
}

export function LoadingSpinner({ size = 6, className }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading…"
      className={clsx(
        "min-h-screen flex items-center justify-center",
        className
        // hide from screen‑reader if parent already has status
        // "sr-only"
      )}
    >
      <Loader2
        className="animate-spin"
        style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
      />
    </div>
  );
}
