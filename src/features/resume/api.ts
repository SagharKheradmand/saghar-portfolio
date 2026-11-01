import type { ResumeContent } from "../../../shared/content.ts";
import { getJson } from "../../lib/api.ts";

export const getResume = (signal?: AbortSignal) => getJson<ResumeContent>("/api/resume", signal);
