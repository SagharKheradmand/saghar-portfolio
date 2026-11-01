import { useEffect, useState } from "react";
import type { Profile } from "../../../shared/content.ts";
import { getProfile } from "./api";

export type ProfileState =
  | { status: "loading"; profile: null }
  | { status: "ready"; profile: Profile }
  | { status: "error"; profile: null };

export function useProfile(): ProfileState {
  const [state, setState] = useState<ProfileState>({ status: "loading", profile: null });

  useEffect(() => {
    const controller = new AbortController();

    getProfile(controller.signal)
      .then((profile) => setState({ status: "ready", profile }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error", profile: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}
