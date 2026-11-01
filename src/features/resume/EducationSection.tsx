import { Section } from "../../components/layout/Section";
import type { ResumeState } from "./use-resume";

interface EducationSectionProps {
  state: ResumeState;
}

export function EducationSection({ state }: EducationSectionProps) {
  return (
    <Section id="education" title="Education" tone="raised">
      <div aria-busy={state.status === "loading"} className="border-t border-rule">
        {state.status === "loading" && (
          <p role="status" className="pt-8 text-muted-ink">
            Loading education…
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="pt-8 text-muted-ink">
            Education details are unavailable.
          </p>
        )}
        {state.status === "ready" &&
          state.data.education.map((item) => (
            <article
              key={`${item.degree}-${item.institution}`}
              className="grid gap-5 border-b border-rule py-8 min-[700px]:grid-cols-[1fr_auto] min-[700px]:gap-8"
            >
              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-blue uppercase">
                  {item.institution}
                </p>
                <h3 className="max-w-[22ch] font-display text-3xl leading-tight text-ink min-[900px]:text-4xl">
                  {item.degree}
                </h3>
                <p className="mt-4 max-w-prose text-muted-ink">{item.focus}</p>
              </div>
              <div className="text-sm text-muted-ink min-[700px]:text-right">
                <p className="font-semibold text-ink tabular-nums">{item.period}</p>
                <p className="mt-1">{item.status}</p>
              </div>
            </article>
          ))}
      </div>
    </Section>
  );
}
