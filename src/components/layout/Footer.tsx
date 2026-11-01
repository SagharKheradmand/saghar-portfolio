import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const homePrefix = window.location.pathname === "/" ? "" : "/";

  return (
    <footer className="border-t border-rule bg-raised">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-gutter-mobile py-10 text-label text-muted-ink min-[900px]:px-gutter-desktop">
        <span className="text-xs font-bold tracking-[0.18em] text-ink uppercase">Portfolio</span>
        <a
          href={`${homePrefix}#top`}
          className="group inline-flex items-center gap-2 font-medium text-blue transition-colors hover:text-blue-hover hover:underline"
        >
          Back to top{" "}
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </footer>
  );
}
