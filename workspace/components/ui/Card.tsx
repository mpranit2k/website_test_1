import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export function Card({
  title,
  description,
  href,
  linkLabel,
  icon,
  className,
}: CardProps) {
  return (
    <article
      aria-label={title}
      className={cn(
        "group flex h-full flex-col rounded-card border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-colors",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-light text-brand-dark">
          {icon}
        </div>
      )}
      <h3 className="mb-2 font-heading text-lg font-bold text-brand-dark">
        {title}
      </h3>
      <p className="mb-4 flex-1 font-body text-neutral-600">{description}</p>
      {href && (
        <a
          href={href}
          aria-label={linkLabel}
          className="inline-flex items-center font-heading text-sm font-bold text-accent-dark transition-colors hover:text-accent-darker"
        >
          {linkLabel}
        </a>
      )}
    </article>
  );
}
