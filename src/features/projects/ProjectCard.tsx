import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "../../../shared/content.ts";

interface ProjectCardProps {
  project: Project;
  number: number;
  featured?: boolean;
}

function externalUrl(value: string | null): string | null {
  if (!value?.trim()) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function ProjectCard({ project, number, featured = false }: ProjectCardProps) {
  const title = project.title.trim();
  const summary = project.summary.trim();
  const contribution = project.contribution.trim();
  const technologies = [
    ...new Set(project.technologies.map((item) => item.trim()).filter(Boolean)),
  ];
  const repositoryUrl = externalUrl(project.repositoryUrl);
  const liveUrl = externalUrl(project.liveUrl);
  const image = project.image?.trim();
  const imageAlt = project.imageAlt?.trim() || `Preview of ${title}`;
  const imageCaption = project.imageCaption?.trim();

  return (
    <article
      data-project-slug={project.slug}
      className={`group flex h-full flex-col transition-[transform,background-color,border-color,box-shadow] duration-300 ${
        featured
          ? "overflow-hidden border border-rule bg-feature hover:-translate-y-1 hover:border-blue hover:shadow-[0_24px_50px_rgba(0,0,0,0.14)] focus-within:-translate-y-1 focus-within:border-blue"
          : "border-t border-rule py-8 hover:border-blue hover:bg-feature/60 focus-within:border-blue focus-within:bg-feature/60 min-[900px]:py-10"
      }`}
    >
      {image && (
        <figure
          className={
            featured
              ? "overflow-hidden border-b border-rule bg-white"
              : "mt-8 overflow-hidden border border-rule bg-white"
          }
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className={
              featured
                ? "block aspect-[16/10] w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                : "block aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            }
          />
          {featured && imageCaption && (
            <figcaption className="border-t border-rule bg-feature px-5 py-3 text-xs leading-relaxed text-muted-ink">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      )}
      <div className={featured ? "flex flex-1 flex-col p-5 min-[900px]:p-7" : ""}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue tabular-nums">
            {String(number).padStart(2, "0")}
          </p>
          <p className="text-xs font-medium tracking-wide text-muted-ink">{project.category}</p>
        </div>
        <h4
          className={`mt-8 max-w-[20ch] font-display leading-[1.08] tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-blue group-focus-within:text-blue ${
            featured
              ? "text-4xl min-[900px]:text-5xl"
              : "text-project-mobile min-[900px]:text-project-desktop"
          }`}
        >
          {title}
        </h4>
        {summary && (
          <p
            className={`mt-5 max-w-[58ch] text-muted-ink ${featured ? "text-base min-[900px]:text-lg" : ""}`}
          >
            {summary}
          </p>
        )}
        {contribution && (
          <p className="mt-4 max-w-[58ch] text-muted-ink">
            <span className="font-medium text-ink">Contribution: </span>
            {contribution}
          </p>
        )}
        {technologies.length > 0 && (
          <ul
            aria-label={`Technologies for ${title}`}
            className="mt-7 flex flex-wrap gap-x-4 gap-y-2"
          >
            {technologies.map((technology) => (
              <li key={technology} className="text-xs font-medium tracking-wide text-muted-ink">
                <span aria-hidden="true" className="mr-2 text-blue">
                  /
                </span>
                {technology}
              </li>
            ))}
          </ul>
        )}
        {(repositoryUrl || liveUrl || featured) && (
          <div className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-10 text-sm font-semibold text-blue">
            {featured && (
              <a
                href={`/projects/${project.slug}`}
                aria-label={`Read ${title} case study`}
                className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-blue-hover hover:underline"
              >
                Read case study <ArrowRight size={17} aria-hidden="true" />
              </a>
            )}
            {repositoryUrl && (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} repository`}
                className="group/link inline-flex min-h-11 items-center gap-2 transition-colors hover:text-blue-hover hover:underline"
              >
                View repository{" "}
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title} live site`}
                className="group/link inline-flex min-h-11 items-center gap-2 transition-colors hover:text-blue-hover hover:underline"
              >
                Visit live site{" "}
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
