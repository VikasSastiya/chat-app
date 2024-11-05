import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "avatar" | "title" | "text" | "button"
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100",
          "bg-[length:400%_100%] animate-[shimmer_1.5s_infinite]",
          {
            "h-6 w-2/5 rounded-md": variant === "title",
            "h-4 w-4/5 rounded-md": variant === "text",
            "h-12 w-12 rounded-full": variant === "avatar",
            "h-full w-full rounded-xl": variant === "card",
            "h-10 w-24 rounded-lg": variant === "button",
            "h-16 w-full rounded-lg": variant === "default",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
