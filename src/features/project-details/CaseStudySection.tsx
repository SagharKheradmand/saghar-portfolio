import type { ReactNode } from "react";

interface CaseStudySectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

export function CaseStudySection({ id, number, title, children }: CaseStudySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-rule py-10 min-[800px]:grid-cols-12 min-[800px]:gap-10 min-[1000px]:py-14"
    >
      <div className="min-[800px]:col-span-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue tabular-nums">{number}</p>
        <h2
          id={`${id}-title`}
          className="mt-3 font-display text-4xl leading-none tracking-[-.025em] text-ink min-[1000px]:text-5xl"
        >
          {title}
          <span aria-hidden="true" className="text-blue">
            .
          </span>
        </h2>
      </div>
      <div className="min-w-0 text-base leading-relaxed text-muted-ink min-[800px]:col-span-8 min-[1000px]:text-lg">
        {children}
      </div>
    </section>
  );
}
