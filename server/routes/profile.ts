import { Hono } from "hono";
import profile from "../../content/profile.json" with { type: "json" };
import type { Profile } from "../../shared/content.ts";

const content: Profile = profile;

export const profileRoutes = new Hono().get("/profile", (context) => context.json(content));
