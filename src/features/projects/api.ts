import type { ProjectsContent } from "../../../shared/content.ts";
import { getJson } from "../../lib/api.ts";

export const getProjects = (signal?: AbortSignal) =>
  getJson<ProjectsContent>("/api/projects", signal);
