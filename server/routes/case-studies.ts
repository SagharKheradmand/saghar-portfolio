import { Hono } from "hono";
import caseStudies from "../../content/case-studies.json" with { type: "json" };
import type { CaseStudiesContent } from "../../shared/content.ts";

const content: CaseStudiesContent = caseStudies;

export const caseStudyRoutes = new Hono().get("/case-studies", (context) => context.json(content));
