import type { CaseStudyArchitectureStep } from "../../../shared/content.ts";
import { CaseStudySection } from "./CaseStudySection";

interface ArchitectureSectionProps {
  steps: CaseStudyArchitectureStep[];
}

export function ArchitectureSection({ steps }: ArchitectureSectionProps) {
  return (
    <CaseStudySection id="architecture" number="04" title="Architecture">
      <ol className="grid gap-3 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={step.stage}
            className="relative border border-rule bg-feature p-5 min-[1000px]:p-6"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-blue tabular-nums">
              STEP {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-semibold text-ink">{step.stage}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-ink">{step.detail}</p>
          </li>
        ))}
      </ol>
    </CaseStudySection>
  );
}
