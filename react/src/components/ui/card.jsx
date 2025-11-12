import * as React from "react"
import { cn } from "@/lib/utils"

function Card({
  className,
  hoverable = true,
  ...props
}) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white! dark:bg-gray-800! text-gray-900! dark:text-gray-100!",
        "flex! flex-col! rounded-2xl! border! border-gray-200! dark:border-gray-700! shadow-lg!",
        "transition-all! duration-300! ease-out!",
        hoverable && "hover:shadow-xl! hover:-translate-y-1! hover:border-primary/50! dark:hover:border-primary/50!",
        "group! relative! overflow-hidden!",
        className
      )}
      {...props} 
    />
  );
}

function CardHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex! flex-col! gap-2! p-6! pb-4!",
        className
      )}
      {...props} 
    />
  );
}

function CardTitle({
  className,
  as: Component = "h3",
  ...props
}) {
  return (
    <Component
      data-slot="card-title"
      className={cn(
        "font-serif! text-xl! font-bold! leading-tight! tracking-tight!",
        "text-gray-900! dark:text-white!",
        "group-hover:text-orange-600! dark:group-hover:text-orange-400!",
        "transition-colors! duration-300!",
        "line-clamp-2! min-h-14!",
        className
      )}
      {...props} 
    />
  );
}

function CardDescription({
  className,
  ...props
}) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-gray-600! dark:text-gray-400! text-sm! leading-relaxed! line-clamp-2!",
        className
      )}
      {...props} 
    />
  );
}

function CardAction({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "absolute! top-4! right-4! z-10!",
        "transition-transform! duration-300! group-hover:scale-110!",
        className
      )}
      {...props} 
    />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (
    <div 
      data-slot="card-content" 
      className={cn(
        "px-6! py-4! space-y-3! flex-1!",
        className
      )} 
      {...props} 
    />
  );
}

function CardFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex! items-center! gap-3! p-6! pt-4! mt-auto!",
        className
      )}
      {...props} 
    />
  );
}

// CardImage para la imagen del evento con overlay
function CardImage({
  src,
  alt = "",
  aspectRatio = "4/3",
  className,
  overlayGradient = true,
  children,
  onError,
  ...props
}) {
  return (
    <div 
      className={cn(
        "relative! overflow-hidden! bg-gray-200! dark:bg-gray-700!",
        "rounded-t-2xl!",
        className
      )}
      style={{ aspectRatio }}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full! h-full! object-cover! transition-transform! duration-500! ease-out! group-hover:scale-110!"
        loading="lazy"
        onError={onError}
        {...props}
      />
      {overlayGradient && (
        <div className="absolute! inset-0! bg-linear-to-t! from-black/60! via-black/20! to-transparent!" />
      )}
      {children && (
        <div className="absolute! top-4! left-4! z-10!">
          {children}
        </div>
      )}
    </div>
  );
}

// CardBadge para badges flotantes sobre la imagen
function CardBadge({
  className,
  variant = "default",
  ...props
}) {
  const variants = {
    default: "bg-white/95! dark:bg-gray-900/95! text-gray-900! dark:text-white! border! border-gray-200/50! dark:border-gray-700/50!",
    primary: "bg-orange-600! text-white! dark:bg-orange-500! dark:text-white! border-0!",
    secondary: "bg-gray-100/95! text-gray-900! dark:bg-gray-800/95! dark:text-white! border! border-gray-200/50! dark:border-gray-700/50!",
    success: "bg-green-600! text-white! dark:bg-green-500! dark:text-white! border-0!",
    warning: "bg-orange-600! text-white! dark:bg-orange-500! dark:text-white! border-0!",
  };

  return (
    <span
      className={cn(
        "inline-flex! items-center! rounded-full! px-3! py-1.5! text-xs! font-semibold!",
        "shadow-md! backdrop-blur-sm!",
        "transition-transform! hover:scale-105!",
        variants[variant],
        className
      )}
      {...props} 
    />
  );
}

// CardStat para mostrar estadísticas o info adicional
function CardStat({
  icon: Icon,
  label,
  value,
  className,
}) {
  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      {Icon && <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />}
      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 line-clamp-1">{value}</span>
    </div>
  );
}

// CardPrice para mostrar precios destacados
function CardPrice({
  price,
  originalPrice,
  currency = "€",
  free = false,
  className,
}) {
  if (free || price === "Gratis") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-xl font-bold text-green-600 dark:text-green-400">Gratis</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {originalPrice && (
        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
          {originalPrice}{currency}
        </span>
      )}
      <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
        {price}{currency}
      </span>
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
  CardBadge,
  CardStat,
  CardPrice,
}