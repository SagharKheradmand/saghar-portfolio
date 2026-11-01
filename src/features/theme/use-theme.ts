import { useEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

function readPreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function applyTheme(preference: ThemePreference, systemIsDark: boolean) {
  const theme = preference === "system" ? (systemIsDark ? "dark" : "light") : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#070c16" : "#f5f8fc");
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => applyTheme(preference, media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [preference]);

  useEffect(() => {
    const syncPreference = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setPreference(readPreference());
    };
    window.addEventListener("storage", syncPreference);
    return () => window.removeEventListener("storage", syncPreference);
  }, []);

  function changePreference(next: ThemePreference) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
    setPreference(next);
  }

  return { preference, changePreference };
}
