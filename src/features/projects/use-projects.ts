import { useEffect, useState } from "react";
import type { ProjectsContent } from "../../../shared/content.ts";
import { getProjects } from "./api";

type ProjectsState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: ProjectsContent }
  | { status: "error"; data: null };

export function useProjects(): ProjectsState {
  const [state, setState] = useState<ProjectsState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    getProjects(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}
