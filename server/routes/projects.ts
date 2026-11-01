import { Hono } from "hono";
import projects from "../../content/projects.json" with { type: "json" };
import type { ProjectsContent } from "../../shared/content.ts";

const content: ProjectsContent = projects;

export const projectRoutes = new Hono().get("/projects", (context) => context.json(content));
