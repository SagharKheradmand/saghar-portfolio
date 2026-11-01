import { Plus } from "lucide-react";
import { navigation } from "./navigation";
import { useActiveSection } from "./use-active-section";
import { ThemeToggle } from "../../features/theme/ThemeToggle";

export function Header() {
  const activeSection = useActiveSection();
  const homePrefix = window.location.pathname === "/" ? "" : "/";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:not-sr-only focus:bg-blue focus:px-4 focus:py-2 focus:text-on-blue"
      >
        Skip to content
      </a>
      <header
        id="top"
        className="sticky top-0 z-40 border-b border-rule bg-canvas/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-18 max-w-[90rem] items-center justify-between px-gutter-mobile min-[900px]:h-20 min-[900px]:px-gutter-desktop">
          <a
            href={`${homePrefix}#top`}
            className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.18em] text-ink uppercase hover:text-blue"
          >
            <span
              aria-hidden="true"
              className="h-3 w-3 rotate-45 bg-blue transition-transform duration-300 group-hover:rotate-[135deg]"
            />
            Portfolio
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 min-[1100px]:flex min-[1300px]:gap-8"
          >
            {navigation.map(({ id, label }) => (
              <a
                key={id}
                href={`${homePrefix}#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                className="border-b border-transparent py-2 text-label font-medium text-muted-ink transition-[color,border-color] hover:border-blue/50 hover:text-blue aria-[current=location]:border-blue aria-[current=location]:text-blue"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 min-[700px]:gap-4">
            <ThemeToggle />
            <details
              className="group relative min-[1100px]:hidden"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.currentTarget.open = false;
                  event.currentTarget.querySelector("summary")?.focus();
                }
              }}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-2 py-2 text-label font-medium text-ink hover:text-blue marker:hidden">
                Menu
                <Plus
                  aria-hidden="true"
                  size={16}
                  className="text-blue transition-transform group-open:rotate-45"
                />
              </summary>
              <nav
                aria-label="Mobile"
                className="absolute top-full right-0 mt-3 flex max-h-[min(75vh,32rem)] min-w-48 flex-col overflow-y-auto border border-rule bg-surface p-2 shadow-[0_20px_35px_rgba(0,0,0,0.28)]"
              >
                {navigation.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`${homePrefix}#${id}`}
                    aria-current={activeSection === id ? "location" : undefined}
                    className="px-4 py-3 text-label font-medium text-ink hover:bg-raised hover:text-blue aria-[current=location]:text-blue"
                    onClick={(event) => {
                      const menu = event.currentTarget.closest("details");
                      if (menu) menu.open = false;
                    }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
