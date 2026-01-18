import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Pill = ({
  href,
  isLogo = false,
  children,
  className,
}: {
  href: string;
  isLogo?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  const parts = React.Children.toArray(children);
  const textParts = parts.filter(
    (part) => typeof part === "string" || typeof part === "number",
  );
  const textValue = textParts.map(String).join("");
  const hasAnimatedText = !isLogo && textValue.trim().length > 0;

  const animatedContent =
    hasAnimatedText ?
      parts.map((part, index) => {
        if (typeof part !== "string" && typeof part !== "number") {
          return part;
        }

        const text = String(part);

        return (
          <span
            key={`pill-text-${index}`}
            aria-hidden="true"
            className="relative inline-block overflow-hidden align-middle"
          >
            <span className="block opacity-0">{text}</span>
            <span className="absolute left-0 top-0 w-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
              {text}
            </span>
            <span className="absolute left-0 top-0 w-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
              {text}
            </span>
          </span>
        );
      })
    : children;

  const content =
    hasAnimatedText ?
      <>
        <span className="sr-only">{textValue}</span>
        {animatedContent}
      </>
    : animatedContent;

  return (
    <Link
      className={cn(
        "group inline-flex items-center justify-center",
        isLogo ? "rounded-full" : "rounded-full border border-[#1F1D1D]/60",
        className,
      )}
      href={href}
    >
      {content}
    </Link>
  );
};

export default Pill;
