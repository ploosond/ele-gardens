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
        <div className="animate-fade-in mb-4 inline-block rounded-full bg-garden-100 px-3 py-1 text-sm font-medium text-garden-800">
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
            "animate-fade-in-up max-w-2xl text-muted-foreground [animation-delay:200ms]",
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
