import { ArrowRight } from "lucide-react";
import type { ProfileState } from "./use-profile";

interface ProfileAboutProps {
  state: ProfileState;
}

export function ProfileAbout({ state }: ProfileAboutProps) {
  if (state.status === "loading") {
    return <p className="border-t border-rule pt-8 text-muted-ink">Loading profile details…</p>;
  }

  if (state.status === "error") {
    return (
      <p className="border-t border-rule pt-8 text-muted-ink">Profile details are unavailable.</p>
    );
  }

  const about = state.profile.about.trim();
  if (!about) {
    return (
      <div className="border-t border-rule pt-8">
        <p className="max-w-[20ch] font-display text-4xl leading-tight text-ink">
          Start with the projects.
        </p>
        <p className="mt-5 text-muted-ink">Profile details are not available yet.</p>
        <a
          href="#work"
          className="mt-8 inline-flex items-center gap-2 font-semibold text-blue hover:underline"
        >
          Explore projects <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="border-t border-rule pt-8">
      <p className="max-w-prose whitespace-pre-line text-lg text-ink">{about}</p>
    </div>
  );
}
