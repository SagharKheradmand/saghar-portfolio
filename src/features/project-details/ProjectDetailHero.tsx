import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project, ProjectCaseStudy } from "../../../shared/content.ts";

interface ProjectDetailHeroProps {
  project: Project;
  study: ProjectCaseStudy;
  number: number;
}

export function ProjectDetailHero({ project, study, number }: ProjectDetailHeroProps) {
  return (
    <section className="border-b border-rule bg-canvas">
      <div className="mx-auto max-w-[90rem] px-gutter-mobile pt-10 pb-16 min-[900px]:px-gutter-desktop min-[900px]:pt-14 min-[900px]:pb-24">
        <a
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-ink transition-colors hover:text-blue"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to all projects
        </a>
        <div className="mt-10 grid items-center gap-12 min-[900px]:mt-14 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(25rem,.9fr)] min-[900px]:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-blue uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-blue" />
              Case study / {String(number).padStart(2, "0")} / {project.category}
            </p>
            <h1
              id="project-title"
              className="mt-8 max-w-[13ch] font-display text-[clamp(3.3rem,8vw,6.6rem)] leading-[.92] tracking-[-.045em] text-ink"
            >
              {project.title}
            </h1>
            <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted-ink min-[700px]:text-xl">
              {project.summary}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 bg-blue px-5 py-3 text-sm font-semibold text-on-blue transition-colors hover:bg-blue-hover"
              >
                View GitHub repository <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href={study.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-rule px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Read project README <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          {project.image && (
            <figure className="overflow-hidden border border-rule bg-white shadow-[0_28px_70px_rgba(0,0,0,.2)]">
              <img
                src={project.image}
                alt={project.imageAlt || `${project.title} repository output`}
                width={1200}
                height={750}
                fetchPriority="high"
                decoding="async"
                className="block aspect-[16/10] w-full object-contain"
              />
              {project.imageCaption && (
                <figcaption className="border-t border-rule bg-feature px-5 py-3 text-xs leading-relaxed text-muted-ink">
                  {project.imageCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
