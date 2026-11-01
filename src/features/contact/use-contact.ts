import { useEffect, useState } from "react";
import type { Contact } from "../../../shared/content.ts";
import { getContact } from "./api";

type ContactState =
  | { status: "loading"; data: null }
  | { status: "ready"; data: Contact }
  | { status: "error"; data: null };

export function useContact(): ContactState {
  const [state, setState] = useState<ContactState>({ status: "loading", data: null });

  useEffect(() => {
    const controller = new AbortController();

    getContact(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error", data: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}
