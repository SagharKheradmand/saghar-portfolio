import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import type { ResumeState } from "../resume/use-resume";
import { NeuralNetworkVisual } from "./NeuralNetworkVisual";
import type { ProfileState } from "./use-profile";

interface ProfileHeroProps {
  state: ProfileState;
  resume: ResumeState;
}

export function ProfileHero({ state, resume }: ProfileHeroProps) {
  const profile = state.status === "ready" ? state.profile : null;
  const name = profile?.name.trim();
  const [firstName, ...lastName] = name?.split(/\s+/) ?? [];
  const headline = profile?.headline.trim();
  const introduction = profile?.introduction.trim();
  const resumeUrl =
    resume.status === "ready" && resume.data.pdfUrl.startsWith("/resume/")
      ? resume.data.pdfUrl
      : null;

  return (
    <section
      aria-labelledby="profile-title"
      aria-busy={state.status === "loading"}
      className="hero-shell relative isolate overflow-hidden border-b border-rule bg-canvas"
    >
      <div
        aria-hidden="true"
        className="hero-halo absolute top-[-16rem] right-[-18rem] h-[42rem] w-[42rem] rounded-full"
      />
      <div className="relative mx-auto grid max-w-[90rem] gap-10 px-gutter-mobile pt-20 pb-12 min-[700px]:px-gutter-desktop min-[1100px]:min-h-[46rem] min-[1100px]:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] min-[1100px]:items-center min-[1100px]:gap-0 min-[1100px]:pt-20 min-[1100px]:pb-16">
        <div className="relative z-10 min-w-0 min-[1100px]:py-16">
          <p className="hero-reveal flex items-center gap-3 text-[0.65rem] font-semibold tracking-[0.24em] text-[var(--hero-accent)] uppercase min-[700px]:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--hero-accent)]" />
            AI engineering / research / code
          </p>
          <h1
            id="profile-title"
            aria-label={name || "Portfolio"}
            className="hero-reveal mt-9 max-w-[11ch] text-[clamp(3.75rem,13.7vw,5.5rem)] leading-[.88] tracking-[-.075em] text-ink min-[700px]:text-[clamp(5rem,8vw,8rem)] min-[1100px]:mt-11"
          >
            {name ? (
              <>
                <span className="block font-sans font-medium">{firstName}</span>
                <span className="hero-highlight mt-1 block font-display font-normal tracking-[-.055em] text-[var(--hero-cyan)] italic min-[700px]:mt-2">
                  {lastName.join(" ")}
                </span>
              </>
            ) : (
              <span className="font-display">Selected work.</span>
            )}
          </h1>
          <div className="hero-reveal mt-8 max-w-[39rem] border-t border-[var(--hero-divider)] pt-6 min-[700px]:mt-12 min-[700px]:pt-8">
            <p className="max-w-[32ch] text-lg font-medium leading-snug text-ink min-[700px]:text-[1.45rem]">
              {headline || "Projects in software and machine learning."}
            </p>
            {introduction && (
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-muted-ink min-[700px]:text-base">
                {introduction}
              </p>
            )}
            {state.status === "loading" && (
              <p role="status" className="mt-4 text-muted-ink">
                Loading profile…
              </p>
            )}
            {state.status === "error" && (
              <p role="alert" className="mt-4 text-muted-ink">
                Profile information is unavailable.
              </p>
            )}
          </div>
          <div className="hero-reveal mt-8 flex flex-wrap gap-3 min-[700px]:mt-10">
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[var(--hero-cyan)] px-6 py-3 text-sm font-semibold text-on-blue transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-blue-hover"
            >
              View Projects <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                download={resumeUrl.split("/").at(-1)}
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-[var(--hero-ring)] px-6 py-3 text-sm font-semibold text-ink transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--hero-cyan)] hover:bg-[var(--hero-hover)]"
              >
                Download Resume <Download size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <div className="relative -mx-4 min-w-0 min-[700px]:mx-0 min-[1100px]:-mr-10">
          <NeuralNetworkVisual
            focusAreas={profile?.focusAreas ?? []}
            portrait={profile?.portrait ?? null}
          />
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[90rem] items-center justify-between border-t border-[var(--hero-border)] px-gutter-mobile py-4 text-[0.64rem] font-medium tracking-[0.15em] text-muted-ink uppercase min-[700px]:px-gutter-desktop">
        <span>Research-led software</span>
        <a
          href="#work"
          className="inline-flex items-center gap-2 text-[var(--hero-cyan)] transition-colors hover:text-blue-hover hover:underline"
        >
          Scroll to explore <ArrowDownRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
