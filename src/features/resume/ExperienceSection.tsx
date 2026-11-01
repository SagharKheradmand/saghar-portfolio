import { Section } from "../../components/layout/Section";
import type { ResumeState } from "./use-resume";

interface ExperienceSectionProps {
  state: ResumeState;
}

export function ExperienceSection({ state }: ExperienceSectionProps) {
  return (
    <Section id="experience" title="Experience">
      <div aria-busy={state.status === "loading"} className="border-t border-rule">
        {state.status === "loading" && (
          <p role="status" className="pt-8 text-muted-ink">
            Loading experience…
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="pt-8 text-muted-ink">
            Experience details are unavailable.
          </p>
        )}
        {state.status === "ready" &&
          state.data.experience.map((item) => (
            <article key={`${item.role}-${item.period}`} className="border-b border-rule py-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-blue uppercase">
                {item.period}
              </p>
              <h3 className="mt-4 font-display text-3xl leading-tight text-ink min-[900px]:text-4xl">
                {item.role}
              </h3>
              <p className="mt-2 text-sm text-muted-ink">{item.organization}</p>
              <ul className="mt-6 space-y-3 text-muted-ink">
                {item.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span aria-hidden="true" className="text-blue">
                      /
                    </span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
      </div>
    </Section>
  );
}
