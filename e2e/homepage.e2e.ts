import { expect, test } from "@playwright/test";
import { inflateSync } from "node:zlib";

test("homepage loads with its main sections", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  for (const name of ["Work", "About", "Education", "Experience", "Skills", "Resume", "Contact"]) {
    const section = page.getByRole("region", { name, exact: true });
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", { name, level: 2, exact: true })).toBeVisible();
  }
});

test("theme follows the system and persists a selected preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  const system = page.getByRole("button", { name: "System theme" });
  const light = page.getByRole("button", { name: "Light theme" });
  const dark = page.getByRole("button", { name: "Dark theme" });

  await expect(system).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const lightBackground = await page
    .locator("body")
    .evaluate((body) => getComputedStyle(body).backgroundColor);

  await dark.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-theme"))).toBe("dark");
  expect(
    await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor),
  ).not.toBe(lightBackground);
  await page.reload();
  await expect(dark).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await system.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await light.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(light).toHaveAttribute("aria-pressed", "true");
});

test("resume details and professional email come from content without exposing a phone number", async ({
  page,
}) => {
  await page.goto("/");

  const resumeResponse = await page.request.get("/api/resume");
  const resume = (await resumeResponse.json()) as {
    pdfUrl: string;
    education: Array<{ degree: string; institution: string }>;
    experience: Array<{ role: string; details: string[] }>;
    skillGroups: Array<{ category: string; skills: string[] }>;
  };
  const contactResponse = await page.request.get("/api/contact");
  const contact = (await contactResponse.json()) as {
    email: string | null;
    links: Array<{ label: string; url: string }>;
  };

  await expect(resumeResponse).toBeOK();
  await expect(contactResponse).toBeOK();
  await expect(page.getByRole("region", { name: "Education" })).toContainText(
    resume.education[0].institution,
  );
  await expect(page.getByRole("region", { name: "Experience" })).toContainText(
    resume.experience[0].role,
  );
  await expect(page.getByRole("region", { name: "Skills" })).toContainText(
    resume.skillGroups[0].skills[0],
  );
  for (const group of resume.skillGroups) {
    await expect(
      page.getByRole("region", { name: "Skills" }).getByRole("heading", { name: group.category }),
    ).toBeVisible();
  }
  await expect(page.getByRole("link", { name: /View Resume/ })).toHaveAttribute(
    "href",
    resume.pdfUrl,
  );
  await expect(page.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "download",
    /\.pdf$/,
  );
  const pdfResponse = await page.request.get(resume.pdfUrl);
  await expect(pdfResponse).toBeOK();
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
  const pdf = (await pdfResponse.body()).toString("latin1");
  expect(pdf).toMatch(/^%PDF-/);
  const pdfText = [...pdf.matchAll(/stream\n([\s\S]*?)\nendstream/g)]
    .map((match) => {
      try {
        return inflateSync(Buffer.from(match[1], "latin1")).toString("latin1");
      } catch {
        return "";
      }
    })
    .join(" ");
  expect(pdfText).toContain("sagha");
  expect(pdfText).not.toMatch(/\b09\d{9}\b/);
  expect(contact.email).toBe("sagharhqi@gmail.com");
  await expect(page.getByRole("link", { name: contact.email ?? "" })).toHaveAttribute(
    "href",
    `mailto:${contact.email}`,
  );
  const linkedIn = contact.links.find((link) => link.label === "LinkedIn");
  expect(linkedIn?.url).toBe("https://www.linkedin.com/in/saghar-kheradmand-403a523aa");
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    linkedIn?.url ?? "",
  );
  expect(await page.locator("body").innerText()).not.toMatch(/\b09\d{9}\b/);
});

test("profile identity and introduction come from profile content", async ({ page }) => {
  await page.goto("/");

  const response = await page.request.get("/api/profile");
  const profile = (await response.json()) as {
    name: string;
    headline: string;
    introduction: string;
    about: string;
  };

  await expect(response).toBeOK();
  await expect(page.getByRole("heading", { level: 1, name: profile.name })).toBeVisible();
  await expect(page.getByText(profile.headline, { exact: true })).toBeVisible();
  await expect(page.getByText(profile.introduction, { exact: true })).toBeVisible();
  const portrait = page.getByRole("img", { name: "Portrait of Saghar Kheradmand" });
  await expect(portrait).toHaveAttribute("src", "/images/saghar-kheradmand-github-avatar.jpg");
  await expect(portrait).toHaveJSProperty("naturalWidth", 460);
  await expect(page.getByRole("region", { name: "About", exact: true })).toContainText(
    profile.about,
  );
});

test("hero actions and research network work with keyboard input", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("section[aria-labelledby='profile-title']");
  const resumeResponse = await page.request.get("/api/resume");
  const resume = (await resumeResponse.json()) as { pdfUrl: string };

  await expect(hero.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "#work");
  await expect(hero.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
    "href",
    resume.pdfUrl,
  );
  await expect(hero.getByRole("link", { name: "Download Resume" })).toHaveAttribute(
    "download",
    /\.pdf$/,
  );

  const vision = hero.getByRole("button", { name: "Explore Computer vision" });
  const pattern = hero.getByRole("button", { name: "Explore Pattern recognition" });
  await expect(vision).toHaveAttribute("aria-pressed", "true");
  await pattern.focus();
  await pattern.press("Enter");
  await expect(pattern).toHaveAttribute("aria-pressed", "true");
  await expect(hero).toContainText(
    "Classification, dimensionality reduction, and model evaluation.",
  );
});

test("interactive surfaces respond to hover and keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const focusOutline = await page.evaluate(
    () => getComputedStyle(document.activeElement as HTMLElement).outlineStyle,
  );
  expect(focusOutline).toBe("solid");

  const highlight = page.locator(".hero-highlight");
  const originalShadow = await highlight.evaluate(
    (element) => getComputedStyle(element).textShadow,
  );
  await highlight.hover();
  expect(await highlight.evaluate((element) => getComputedStyle(element).textShadow)).not.toBe(
    originalShadow,
  );

  const card = page.getByTestId("featured-projects").locator("article").first();
  await card.hover();
  expect(await card.evaluate((element) => getComputedStyle(element).translate)).not.toBe("none");

  const filter = page
    .getByRole("group", { name: "Filter projects by category" })
    .getByRole("button", { name: /^Computer Vision/ });
  const originalBorder = await filter.evaluate((element) => getComputedStyle(element).borderColor);
  await filter.hover();
  expect(await filter.evaluate((element) => getComputedStyle(element).borderColor)).not.toBe(
    originalBorder,
  );
});

test("projects are filterable, accessible, and shown in only one section", async ({ page }) => {
  await page.goto("/");

  const work = page.getByRole("region", { name: "Work", exact: true });
  const featured = work.getByTestId("featured-projects");
  const allProjects = work.getByTestId("all-projects");
  const categoryFilters = work.getByRole("group", { name: "Filter projects by category" });
  const response = await page.request.get("/api/projects");
  const { projects } = (await response.json()) as {
    projects: Array<{
      slug: string;
      title: string;
      featured: boolean;
      category: string;
      repositoryUrl: string;
    }>;
  };
  const expectedFeatured = projects.filter((project) => project.featured);
  const expectedAll = projects.filter((project) => !project.featured);

  await expect(response).toBeOK();
  await expect(work.getByRole("heading", { name: "Featured Projects" })).toBeVisible();
  await expect(work.getByRole("heading", { name: "All Projects" })).toBeVisible();
  await expect(featured.locator("article")).toHaveCount(expectedFeatured.length);
  await expect(allProjects.locator("article")).toHaveCount(expectedAll.length);
  expect(projects.find((project) => project.slug === "real-world-kernel-learning")?.category).toBe(
    "Applied Machine Learning",
  );
  expect(
    projects.find((project) => project.slug === "reinforcement-learning-game-agents")?.category,
  ).toBe("Reinforcement Learning");
  expect(
    projects.find(
      (project) => project.slug === "tiny-shakespeare-memory-duel-elman-vs-jordan-Network",
    )?.category,
  ).toBe("Deep Learning & Language");

  const featuredSlugs = await featured
    .locator("article")
    .evaluateAll((cards) => cards.map((card) => card.getAttribute("data-project-slug")));
  const allSlugs = await allProjects
    .locator("article")
    .evaluateAll((cards) => cards.map((card) => card.getAttribute("data-project-slug")));
  expect(new Set([...featuredSlugs, ...allSlugs]).size).toBe(projects.length);
  expect(featuredSlugs).toEqual([
    "molecular-gcn-selfies-transformer",
    "real-world-kernel-learning",
    "hough-transform-image-processing",
    "covid19-severity-imbalanced-learning",
  ]);
  expect(allSlugs).toContain("reinforcement-learning-game-agents");

  const featuredEvidence = [
    {
      slug: "molecular-gcn-selfies-transformer",
      alt: "Grid of generated molecular structures from the project notebook.",
    },
    {
      slug: "real-world-kernel-learning",
      alt: "Bar chart of missing-value rates for selected columns in the Airbnb Open Data dataset.",
    },
    {
      slug: "hough-transform-image-processing",
      alt: "Traffic-light photo annotated with detected lamp circles and state labels.",
    },
    {
      slug: "covid19-severity-imbalanced-learning",
      alt: "Chart of train error, test error, and severe-class F1 over AdaBoost rounds.",
    },
  ];
  const realWorldCard = featured.locator('article[data-project-slug="real-world-kernel-learning"]');
  await expect(realWorldCard.getByRole("link", { name: /repository/i })).toHaveAttribute(
    "href",
    "https://github.com/SagharKheradmand/real-world-kernel-learning",
  );
  for (const evidence of featuredEvidence) {
    const card = featured.locator(`article[data-project-slug="${evidence.slug}"]`);
    const repository = expectedFeatured.find((project) => project.slug === evidence.slug);
    await expect(
      card.getByRole("link", { name: `Read ${repository?.title} case study` }),
    ).toHaveAttribute("href", `/projects/${evidence.slug}`);
    await expect(card.getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      repository?.repositoryUrl ?? "",
    );
    const image = card.getByRole("img", { name: evidence.alt });
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      )
      .toBe(true);
  }

  const allFilter = categoryFilters.getByRole("button", { name: /^All projects/ });
  await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  const category = expectedAll[0]?.category;
  expect(category).toBeTruthy();
  const filter = categoryFilters.getByRole("button", {
    name: new RegExp(`^${category} \\d+$`),
  });
  await filter.focus();
  await filter.press("Enter");
  await expect(filter).toHaveAttribute("aria-pressed", "true");
  await expect(allProjects.locator("article")).toHaveCount(
    expectedAll.filter((project) => project.category === category).length,
  );
  await allFilter.click();
  await expect(allFilter).toHaveAttribute("aria-pressed", "true");
  await expect(allProjects.locator("article")).toHaveCount(expectedAll.length);
});

test("featured project case studies expose verified content and project navigation", async ({
  page,
}) => {
  const projectsResponse = await page.request.get("/api/projects");
  const caseStudiesResponse = await page.request.get("/api/case-studies");
  const { projects } = (await projectsResponse.json()) as {
    projects: Array<{ slug: string; title: string; featured: boolean; repositoryUrl: string }>;
  };
  const { caseStudies } = (await caseStudiesResponse.json()) as {
    caseStudies: Array<{
      slug: string;
      metrics: Array<{ label: string; value: string }>;
      evidenceUrl: string;
      evidenceLabel: string;
      sourceUrl: string;
    }>;
  };
  const featured = [
    "molecular-gcn-selfies-transformer",
    "real-world-kernel-learning",
    "hough-transform-image-processing",
    "covid19-severity-imbalanced-learning",
  ].map((slug) => projects.find((project) => project.slug === slug));

  await expect(projectsResponse).toBeOK();
  await expect(caseStudiesResponse).toBeOK();
  expect(
    caseStudies.map((study) => study.slug).sort((left, right) => left.localeCompare(right)),
  ).toEqual(
    featured.map((project) => project?.slug ?? "").sort((left, right) => left.localeCompare(right)),
  );

  for (const project of featured) {
    expect(project).toBeDefined();
    if (!project) continue;
    const study = caseStudies.find((candidate) => candidate.slug === project.slug);
    expect(study).toBeDefined();
    await page.goto(`/projects/${project.slug}`);
    const detail = page.getByTestId("project-case-study");

    await expect(detail).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
    for (const section of [
      "Overview",
      "Problem",
      "Approach",
      "Architecture",
      "Technologies",
      "Results",
      "Limitations",
    ]) {
      await expect(detail.getByRole("heading", { level: 2, name: section })).toBeVisible();
    }
    await expect(detail.getByRole("link", { name: "View GitHub repository" })).toHaveAttribute(
      "href",
      project.repositoryUrl,
    );
    await expect(detail.getByRole("link", { name: "Read project README" })).toHaveAttribute(
      "href",
      study?.sourceUrl ?? "",
    );
    await expect(detail.getByRole("link", { name: study?.evidenceLabel ?? "" })).toHaveAttribute(
      "href",
      study?.evidenceUrl ?? "",
    );
    const image = detail.getByRole("img");
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      )
      .toBe(true);
  }

  await page.goto(`/projects/${featured[0]?.slug}`);
  const navigation = page.getByRole("navigation", { name: "Featured project case studies" });
  await expect(navigation.getByRole("link", { name: /Next project/ })).toHaveAttribute(
    "href",
    `/projects/${featured[1]?.slug}`,
  );
  await navigation.getByRole("link", { name: /Next project/ }).click();
  await expect(page).toHaveURL(new RegExp(`/projects/${featured[1]?.slug}$`));
  await expect(page.getByRole("link", { name: "Back to all projects" })).toHaveAttribute(
    "href",
    "/#work",
  );
});

test("portfolio layout fits a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByTestId("all-projects").locator("article").first().waitFor();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.getByRole("heading", { level: 1, name: "Saghar Kheradmand" })).toBeVisible();
  const systemsNode = page.getByRole("button", { name: "Explore Intelligent systems" });
  await systemsNode.click();
  await expect(systemsNode).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("group", { name: "Filter projects by category" })).toBeVisible();
  await expect(page.getByTestId("featured-projects").locator("article")).toHaveCount(4);
});
