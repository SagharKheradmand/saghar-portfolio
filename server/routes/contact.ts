import { Hono } from "hono";
import contact from "../../content/contact.json" with { type: "json" };
import type { Contact } from "../../shared/content.ts";

const content: Contact = contact;

export const contactRoutes = new Hono().get("/contact", (context) => context.json(content));
