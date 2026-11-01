import { Hono } from "hono";
import resume from "../../content/resume.json" with { type: "json" };
import type { ResumeContent } from "../../shared/content.ts";

const content: ResumeContent = resume;

export const resumeRoutes = new Hono().get("/resume", (context) => context.json(content));
