import { ReactNode } from "react";
import { cn } from "../lib/utils";

const SectionTitle = ({
  subtitle,
  title,
  description,
  alignment = "center",
  className,
  size = "default",
}) => {
  return (
    <div
      className={cn(
        size === "default" ? "mb-10 md:mb-16" : "mb-6",
        {
          "text-left": alignment === "left",
          "text-center": alignment === "center",
          "text-right": alignment === "right",
        },
        className,
      )}
    >
      {subtitle && (
        <div className="animate-fade-in bg-muted text-text mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium">
          {subtitle}
        </div>
      )}
      <h2
        className={cn(
          "animate-fade-in-up mb-4 font-medium",
          size === "default"
            ? "text-3xl md:text-4xl lg:text-5xl"
            : "text-xl md:text-2xl lg:text-3xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <div
          className={cn(
            "animate-fade-in-up text-muted-foreground max-w-2xl [animation-delay:200ms]",
            size === "default" ? "text-lg" : "text-base",
            {
              "mx-auto": alignment === "center",
              "ml-auto": alignment === "right",
            },
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
