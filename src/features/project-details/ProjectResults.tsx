import type { CaseStudyMetric } from "../../../shared/content.ts";
import { CaseStudySection } from "./CaseStudySection";

interface ProjectResultsProps {
  summary: string;
  metrics: CaseStudyMetric[];
}

export function ProjectResults({ summary, metrics }: ProjectResultsProps) {
  return (
    <CaseStudySection id="results" number="06" title="Results">
      <p>{summary}</p>
      {metrics.length > 0 && (
        <ul className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <li key={metric.label} className="border border-rule bg-feature p-5">
              <p className="font-display text-3xl leading-none tracking-tight text-blue min-[1000px]:text-4xl">
                {metric.value}
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">{metric.label}</p>
              <p className="mt-1 text-xs text-muted-ink">{metric.context}</p>
            </li>
          ))}
        </ul>
      )}
    </CaseStudySection>
  );
}
