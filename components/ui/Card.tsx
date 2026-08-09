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
        "group flex h-full flex-col rounded-card border border-brand-100 bg-white p-7 shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:border-brand-200 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-colors",
        className,
      )}
    >
      {icon && (
        <div className="mb-5 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 ring-1 ring-inset ring-brand-200/60 transition-colors duration-300 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
          {icon}
        </div>
      )}
      <h3 className="mb-2 font-heading text-lg font-bold tracking-tight text-brand-900">
        {title}
      </h3>
      <p className="mb-4 flex-1 font-body text-neutral-600">{description}</p>
      {href && (
        <a
          href={href}
          aria-label={linkLabel}
          className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-accent-dark transition-all duration-200 ease-out hover:gap-2.5 hover:text-accent-darker"
        >
          {linkLabel}
          <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}
