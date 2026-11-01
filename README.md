# Portfolio

Minimal React and TypeScript application scaffolded with Vite+ and pnpm. Tailwind CSS and shadcn/ui are configured. Hono provides a health endpoint and serves the production build.

## Commands

- `pnpm install` installs dependencies.
- `pnpm dev` starts Vite+ and Hono; the browser uses port 5173 and `/api/health` is proxied to Hono.
- `pnpm build` type-checks and builds the production assets.
- `pnpm start` serves the built assets and `/api/health` through Hono on port 3000.
- `pnpm preview` serves the production build locally.
- `pnpm lint` runs Vite+ linting.
- `pnpm test` runs the Playwright end-to-end tests and starts the app automatically.

Install the Chromium test browser once with `pnpm exec playwright install chromium --no-shell`.

The shared layout and Profile, Projects, Resume, and Contact features are in place.

## Design system

The deep navy, black, and blue palette, type, spacing, and motion tokens live in `src/index.css`. `src/components/layout` holds the shared Header, Footer, Section, and navigation definitions. The mobile menu uses native `details` and `summary`.

The header theme control offers System, Light, and Dark modes. It stores the selected mode in `localStorage` under `portfolio-theme`; System follows the device color scheme. Theme colors use shared CSS tokens so content components work in both modes.

## Content and API

`content/profile.json`, `content/projects.json`, `content/resume.json`, and `content/contact.json` hold editable, verified content. Their contracts live in `shared/content.ts`. Education, internship experience, categorized skills, and the resume URL are maintained in `content/resume.json`.

Hono exposes `/api/profile`, `/api/projects`, `/api/resume`, `/api/contact`, and `/api/health` through separate route modules in `server/routes`. React data access lives in `src/features/*/api.ts`, with shared HTTP handling in `src/lib/api.ts`. Project entries link to public GitHub repositories and can be curated in `content/projects.json`.

The public PDF at `public/resume/Saghar_Kheradmand_AI_Resume.pdf` is a copy of the supplied resume with the phone number removed. Keep that detail out of future public PDF revisions and JSON content. Playwright reuses an existing local dev server; CI starts a fresh server.
