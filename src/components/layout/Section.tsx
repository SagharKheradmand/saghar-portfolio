import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  wide?: boolean;
  tone?: "base" | "raised";
  children?: ReactNode;
}

export function Section({ id, title, wide = false, tone = "base", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 border-t border-rule py-section-mobile min-[900px]:py-section-desktop ${tone === "raised" ? "bg-raised" : "bg-canvas"}`}
    >
      <div className="mx-auto grid max-w-[90rem] gap-10 px-gutter-mobile min-[900px]:grid-cols-12 min-[900px]:gap-y-14 min-[900px]:px-gutter-desktop">
        <h2
          id={`${id}-title`}
          className="group/heading font-display text-section-mobile tracking-[-0.025em] text-ink min-[900px]:col-span-5 min-[900px]:text-section-desktop"
        >
          {title}
          <span
            aria-hidden="true"
            className="inline-block text-blue transition-transform duration-300 group-hover/heading:-translate-y-1"
          >
            .
          </span>
        </h2>
        {children && (
          <div className={wide ? "min-[900px]:col-span-12" : "min-[900px]:col-span-7"}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
