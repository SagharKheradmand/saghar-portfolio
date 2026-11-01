import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { contactRoutes } from "./routes/contact.ts";
import { caseStudyRoutes } from "./routes/case-studies.ts";
import { healthRoutes } from "./routes/health.ts";
import { profileRoutes } from "./routes/profile.ts";
import { projectRoutes } from "./routes/projects.ts";
import { resumeRoutes } from "./routes/resume.ts";

const app = new Hono();

app.route("/api", healthRoutes);
app.route("/api", profileRoutes);
app.route("/api", projectRoutes);
app.route("/api", contactRoutes);
app.route("/api", caseStudyRoutes);
app.route("/api", resumeRoutes);
app.all("/api/*", (context) => context.notFound());
app.use("*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT ?? 3000),
});
