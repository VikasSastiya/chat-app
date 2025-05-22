import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?:
        | "default"
        | "card"
        | "avatar"
        | "title"
        | "text"
        | "button"
        | "conversation-item"
        | "time";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "animate-pulse rounded-md",
                    "relative isolate overflow-hidden",
                    "before:absolute before:inset-0",
                    "before:-translate-x-full",
                    "before:animate-[shimmer_2s_infinite]",
                    "before:bg-gradient-to-r",
                    "before:from-transparent before:via-gray-200/60 dark:before:via-gray-600/60 before:to-transparent",
                    {
                        "flex items-center space-x-3 p-3 w-full":
                            variant === "conversation-item",
                        "h-12 w-12 rounded-full bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "avatar",
                        "h-4 w-32 bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "text",
                        "h-3 w-12 bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "time",
                        "h-6 w-2/5 bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "title",
                        "h-full w-full rounded-xl bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "card",
                        "h-10 w-24 rounded-lg bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "button",
                        "h-16 w-full rounded-lg bg-gray-200/80 dark:bg-gray-700/25":
                            variant === "default",
                    },
                    className,
                )}
                {...props}
            />
        );
    },
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
