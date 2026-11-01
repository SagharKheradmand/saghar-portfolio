import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "../../../shared/content.ts";

interface ProjectNavigationProps {
  previous: Project | null;
  next: Project | null;
}

function adjacentLink(project: Project, direction: "previous" | "next") {
  const isNext = direction === "next";
  return (
    <a
      href={`/projects/${project.slug}`}
      rel={isNext ? "next" : "prev"}
      className={`group flex min-h-28 flex-col justify-center border border-rule bg-feature p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-blue min-[700px]:p-7 ${isNext ? "items-end text-right" : "items-start"}`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-blue uppercase">
        {!isNext && <ArrowLeft size={15} aria-hidden="true" />}
        {isNext ? "Next project" : "Previous project"}
        {isNext && <ArrowRight size={15} aria-hidden="true" />}
      </span>
      <span className="mt-3 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-blue min-[700px]:text-3xl">
        {project.title}
      </span>
    </a>
  );
}

export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  return (
    <nav
      aria-label="Featured project case studies"
      className="grid gap-3 border-t border-rule py-10 sm:grid-cols-2"
    >
      {previous ? <div>{adjacentLink(previous, "previous")}</div> : <div />}
      {next ? <div>{adjacentLink(next, "next")}</div> : <div />}
    </nav>
  );
}
