import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Section } from "../../components/layout/Section";
import type { ResumeState } from "./use-resume";

interface ResumeSectionProps {
  state: ResumeState;
}

export function ResumeSection({ state }: ResumeSectionProps) {
  const resume = state.status === "ready" ? state.data : null;
  const url = resume?.pdfUrl.startsWith("/resume/") ? resume.pdfUrl : null;

  return (
    <Section id="resume" title="Resume" wide>
      <div
        aria-busy={state.status === "loading"}
        className="grid overflow-hidden border border-rule bg-feature min-[900px]:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]"
      >
        <div className="flex flex-col justify-center p-8 min-[900px]:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue uppercase">
            Curriculum vitae
          </p>
          <h3 className="mt-5 max-w-[17ch] font-display text-4xl leading-[1.06] text-ink min-[900px]:text-5xl">
            The details behind the work.
          </h3>
          {state.status === "loading" && (
            <p role="status" className="mt-5 text-muted-ink">
              Loading resume…
            </p>
          )}
          {state.status === "error" && (
            <p role="alert" className="mt-5 text-muted-ink">
              Resume details are unavailable.
            </p>
          )}
          {resume && <p className="mt-5 max-w-prose text-muted-ink">{resume.intro}</p>}
          {url && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-blue px-5 py-3 text-sm font-semibold text-on-blue transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-blue-hover"
              >
                View Resume <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href={url}
                download={url.split("/").at(-1)}
                className="inline-flex min-h-11 items-center gap-2 border border-blue px-5 py-3 text-sm font-semibold text-blue transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-blue hover:text-on-blue"
              >
                Download CV <Download size={17} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          className="relative flex min-h-56 items-center justify-center border-t border-rule bg-feature-art p-10 min-[900px]:min-h-80 min-[900px]:border-t-0 min-[900px]:border-l"
        >
          <div className="resume-paper relative flex aspect-[4/5] w-40 flex-col border border-blue/50 bg-paper p-5 min-[900px]:w-48">
            <FileText size={25} className="text-blue" strokeWidth={1.4} />
            <div className="mt-10 h-px w-full bg-blue/70" />
            <div className="mt-4 h-px w-3/4 bg-rule" />
            <div className="mt-3 h-px w-full bg-rule" />
            <div className="mt-3 h-px w-2/3 bg-rule" />
            <span className="mt-auto font-display text-2xl text-ink">SK.</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
