import { useEffect, useState } from "react";
import type { Project, ProjectCaseStudy } from "../../../shared/content.ts";
import { getProjects } from "../projects/api.ts";
import { featuredProjectOrder } from "../projects/project-order.ts";
import { getCaseStudies } from "./api.ts";

export type ProjectCaseStudyState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "error" }
  | {
      status: "ready";
      project: Project;
      study: ProjectCaseStudy;
      previous: Project | null;
      next: Project | null;
    };

export function useProjectCaseStudy(slug: string): ProjectCaseStudyState {
  const [state, setState] = useState<ProjectCaseStudyState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([getProjects(controller.signal), getCaseStudies(controller.signal)])
      .then(([projectContent, studyContent]) => {
        const featured = featuredProjectOrder
          .map((featuredSlug) =>
            projectContent.projects.find((project) => project.slug === featuredSlug),
          )
          .filter((project): project is Project => project !== undefined);
        const projectIndex = featured.findIndex((project) => project.slug === slug);
        const project = featured[projectIndex];
        const study = studyContent.caseStudies.find((candidate) => candidate.slug === slug);

        if (!project || !study) {
          setState({ status: "not-found" });
          return;
        }

        setState({
          status: "ready",
          project,
          study,
          previous: featured[projectIndex - 1] ?? null,
          next: featured[projectIndex + 1] ?? null,
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" });
      });

    return () => controller.abort();
  }, [slug]);

  return state;
}
