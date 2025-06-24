import * as React from "react";
import { cn } from "@/lib/utils";

// Assume cn utility from shadcn/ui exists at this path.

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * A custom card component that implements a 'frosted glass' or glassmorphism effect.
 * It features a blurred, translucent background, a subtle border, and a neon glow on hover.
 * This is a stylistic upgrade from the base ShadCN Card, used to display portfolio stats
 * and watchlist items for a premium feel.
 */
const GlassmorphicCard = React.forwardRef<HTMLDivElement, GlassmorphicCardProps>(
  ({ className, children, ...props }, ref) => {
    console.log("GlassmorphicCard loaded");

    return (
      <div
        ref={ref}
        className={cn(
          // --- Base Styles ---
          // Using CSS variables for background and border from the theme
          "rounded-lg border bg-card/50 shadow-lg",
          
          // --- Glassmorphism Effect ---
          // A subtle, semi-transparent border enhances the glass look
          "border-white/10", 
          // The key property for the 'frosted glass' effect
          "backdrop-blur-sm",

          // --- Interactive Effects ---
          // Smooth transition for all properties, especially shadow and border
          "transition-all duration-300 ease-in-out",
          
          // --- Neon Glow on Hover ---
          // Uses an arbitrary value with the 'ring' CSS variable for a dynamic, theme-aware glow.
          // The border also lights up with the same color on hover.
          "hover:shadow-[0_0_20px_0px_hsl(var(--ring)/0.5)] hover:border-ring/30",

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassmorphicCard.displayName = "GlassmorphicCard";

export default GlassmorphicCard;