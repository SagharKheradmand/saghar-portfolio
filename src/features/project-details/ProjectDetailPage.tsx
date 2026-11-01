import { ArrowUpRight } from "lucide-react";
import { ArchitectureSection } from "./ArchitectureSection";
import { CaseStudySection } from "./CaseStudySection";
import { ProjectDetailHero } from "./ProjectDetailHero";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectResults } from "./ProjectResults";
import { featuredProjectOrder } from "../projects/project-order";
import { useProjectCaseStudy } from "./use-project-case-study";

interface ProjectDetailPageProps {
  slug: string;
}

function ProjectDetailMessage({ title, message }: { title: string; message: string }) {
  return (
    <section className="mx-auto min-h-[60vh] max-w-[90rem] px-gutter-mobile py-24 min-[900px]:px-gutter-desktop">
      <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
        Project case study
      </p>
      <h1 className="mt-5 font-display text-5xl tracking-tight text-ink">{title}</h1>
      <p className="mt-5 max-w-[50ch] text-muted-ink">{message}</p>
      <a
        href="/#work"
        className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
      >
        Return to all projects
      </a>
    </section>
  );
}

function TechnologyList({ technologies }: { technologies: string[] }) {
  return (
    <ul aria-label="Project technologies" className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="border border-rule bg-feature px-3 py-2 text-sm font-medium text-ink"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}

function ScopeNotes({ limitations }: { limitations: string[] }) {
  return (
    <CaseStudySection id="limitations" number="07" title="Limitations">
      <ul className="space-y-4">
        {limitations.map((limitation) => (
          <li key={limitation} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
            />
            <span>{limitation}</span>
          </li>
        ))}
      </ul>
    </CaseStudySection>
  );
}

export function ProjectDetailPage({ slug }: ProjectDetailPageProps) {
  const state = useProjectCaseStudy(slug);

  if (state.status === "loading") {
    return <ProjectDetailMessage title="Loading project" message="Project details are loading." />;
  }
  if (state.status === "error") {
    return (
      <ProjectDetailMessage
        title="Project unavailable"
        message="Project details could not be loaded. Please return to the project gallery."
      />
    );
  }
  if (state.status === "not-found") {
    return (
      <ProjectDetailMessage
        title="Case study not found"
        message="This case study is not part of the featured project collection."
      />
    );
  }

  const { project, study, previous, next } = state;
  const number = Math.max(
    1,
    featuredProjectOrder.indexOf(project.slug as (typeof featuredProjectOrder)[number]) + 1,
  );

  return (
    <article data-testid="project-case-study">
      <ProjectDetailHero project={project} study={study} number={number} />
      <div className="mx-auto max-w-[90rem] px-gutter-mobile min-[900px]:px-gutter-desktop">
        <CaseStudySection id="overview" number="01" title="Overview">
          <p>{study.overview}</p>
        </CaseStudySection>
        <CaseStudySection id="problem" number="02" title="Problem">
          <p>{study.problem}</p>
        </CaseStudySection>
        <CaseStudySection id="approach" number="03" title="Approach">
          <p>{study.approach}</p>
        </CaseStudySection>
        <ArchitectureSection steps={study.architecture} />
        <CaseStudySection id="technologies" number="05" title="Technologies">
          <TechnologyList technologies={project.technologies} />
        </CaseStudySection>
        <ProjectResults summary={study.resultSummary} metrics={study.metrics} />
        <ScopeNotes limitations={study.limitations} />
        <div className="border-t border-rule py-8">
          <a
            href={study.evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue transition-colors hover:text-blue-hover hover:underline"
          >
            {study.evidenceLabel} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <ProjectNavigation previous={previous} next={next} />
        <div className="pb-16 text-center">
          <a href="/#work" className="text-sm font-semibold text-blue hover:underline">
            Return to all projects
          </a>
        </div>
      </div>
    </article>
  );
}
