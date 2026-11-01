import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:5173";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts",
  reporter: "list",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chromium" },
    },
  ],
  use: { baseURL },
  webServer: {
    command: "pnpm dev",
    url: `${baseURL}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
