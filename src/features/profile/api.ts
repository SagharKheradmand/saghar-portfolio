import type { Profile } from "../../../shared/content.ts";
import { getJson } from "../../lib/api.ts";

export const getProfile = (signal?: AbortSignal) => getJson<Profile>("/api/profile", signal);
