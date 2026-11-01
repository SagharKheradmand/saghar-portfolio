import type { Contact } from "../../../shared/content.ts";
import { getJson } from "../../lib/api.ts";

export const getContact = (signal?: AbortSignal) => getJson<Contact>("/api/contact", signal);
