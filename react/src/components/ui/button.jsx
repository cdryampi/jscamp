import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 dark:bg-destructive dark:text-white",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:-translate-y-0.5 active:translate-y-0 dark:border-primary dark:text-primary dark:hover:bg-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5 shadow-sm active:translate-y-0 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:hover:bg-accent dark:hover:text-accent-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline hover:text-primary/80 dark:text-primary dark:hover:text-primary/80",
        success:
          "bg-green-600 text-white shadow-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 dark:bg-green-500 dark:text-white dark:hover:bg-green-600",
        warning:
          "bg-orange-600 text-white shadow-lg hover:bg-orange-700 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "size-10",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} 
    />
  );
}

export { Button, buttonVariants }