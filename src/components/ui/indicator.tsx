import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

type IndicatorProps = {
  count: number;
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  maxDisplay?: number;
  showZero?: boolean;
  badgeClassName?: string;
  containerClassName?: string;
} & ComponentProps<"div">;

export const Indicator = ({
  count,
  children,
  position = "top-right",
  maxDisplay = 9,
  showZero = false,
  badgeClassName = "",
  containerClassName = "",
  ...props
}: IndicatorProps) => {
  const shouldShow = showZero ? count >= 0 : count > 0;
  const displayCount = count > maxDisplay ? `${maxDisplay}+` : count;

  const positionClasses = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
  };

  return (
    <div className={cn("relative inline-flex", containerClassName)} {...props}>
      {children}
      {shouldShow && (
        <span
          className={cn(
            "absolute flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white",
            positionClasses[position],
            badgeClassName,
          )}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};
