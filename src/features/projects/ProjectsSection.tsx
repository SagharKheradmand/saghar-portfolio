import { useState } from "react";
import { Section } from "../../components/layout/Section";
import { ProjectCard } from "./ProjectCard";
import { sortFeaturedProjects } from "./project-order";
import { useProjects } from "./use-projects";

export function ProjectsSection() {
  const state = useProjects();
  const [activeCategory, setActiveCategory] = useState("All projects");
  const projects =
    state.status === "ready" ? state.data.projects.filter((project) => project.title.trim()) : [];
  const featuredProjects = sortFeaturedProjects(projects.filter((project) => project.featured));
  const featuredSlugs = new Set(featuredProjects.map((project) => project.slug));
  const allProjects = projects.filter((project) => !featuredSlugs.has(project.slug));
  const categories = [...new Set(allProjects.map((project) => project.category))].sort();
  const visibleProjects =
    activeCategory === "All projects"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <Section id="work" title="Work" wide>
      <div aria-busy={state.status === "loading"}>
        {state.status === "loading" && (
          <p role="status" className="text-muted-ink">
            Loading projects...
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="text-muted-ink">
            Projects could not be loaded.
          </p>
        )}
        {state.status === "ready" && projects.length === 0 && (
          <p className="text-muted-ink">No projects are available yet.</p>
        )}
        {projects.length > 0 && (
          <div className="space-y-24">
            {featuredProjects.length > 0 && (
              <div>
                <h3 className="mb-6 text-sm font-semibold tracking-[0.16em] text-blue uppercase">
                  Featured Projects
                </h3>
                <div className="grid gap-6 min-[900px]:grid-cols-2" data-testid="featured-projects">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} number={index + 1} featured />
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-[0.16em] text-blue uppercase">
                All Projects
              </h3>
              <div
                className="mb-8 flex flex-wrap gap-2"
                role="group"
                aria-label="Filter projects by category"
              >
                {["All projects", ...categories].map((category) => {
                  const selected = activeCategory === category;
                  const count =
                    category === "All projects"
                      ? allProjects.length
                      : allProjects.filter((project) => project.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveCategory(category)}
                      className={`min-h-11 border px-4 py-2 text-sm transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue ${
                        selected
                          ? "border-blue bg-blue text-on-blue hover:bg-blue-hover"
                          : "border-rule text-muted-ink hover:border-blue hover:bg-surface hover:text-blue"
                      }`}
                    >
                      {category} <span className="ml-1 tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>
              {visibleProjects.length === 0 ? (
                <p role="status" className="border-t border-rule py-8 text-muted-ink">
                  No projects in this category.
                </p>
              ) : (
                <div className="grid gap-x-12 min-[900px]:grid-cols-2" data-testid="all-projects">
                  {visibleProjects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} number={index + 1} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
