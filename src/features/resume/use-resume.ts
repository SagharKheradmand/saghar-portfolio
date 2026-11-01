import { useEffect, useState } from "react";
import type { ResumeContent } from "../../../shared/content.ts";
import { getResume } from "./api";

export type ResumeState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: ResumeContent }
  | { status: "error"; data: null };

export function useResume(): ResumeState {
  const [state, setState] = useState<ResumeState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    getResume(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}
