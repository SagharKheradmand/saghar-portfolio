import type { CaseStudiesContent } from "../../../shared/content.ts";
import { getJson } from "../../lib/api.ts";

export const getCaseStudies = (signal?: AbortSignal) =>
  getJson<CaseStudiesContent>("/api/case-studies", signal);
