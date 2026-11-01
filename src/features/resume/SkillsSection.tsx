import { Section } from "../../components/layout/Section";
import type { ResumeState } from "./use-resume";

interface SkillsSectionProps {
  state: ResumeState;
}

export function SkillsSection({ state }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills" wide tone="raised">
      <div aria-busy={state.status === "loading"}>
        {state.status === "loading" && (
          <p role="status" className="text-muted-ink">
            Loading skills…
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="text-muted-ink">
            Skills are unavailable.
          </p>
        )}
        {state.status === "ready" && (
          <div className="grid gap-px overflow-hidden border border-rule bg-rule min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
            {state.data.skillGroups.map((group, index) => (
              <section
                key={group.category}
                aria-labelledby={`skill-group-${index}`}
                className="bg-raised p-6 transition-colors duration-300 hover:bg-feature min-[900px]:p-8"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-blue tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3
                  id={`skill-group-${index}`}
                  className="mt-5 font-display text-2xl text-ink min-[900px]:text-3xl"
                >
                  {group.category}
                </h3>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-rule px-3 py-1.5 text-sm text-muted-ink transition-colors duration-200 hover:border-blue/60 hover:bg-surface hover:text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
