import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "./use-theme";

const choices = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { preference, changePreference } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex shrink-0 items-center rounded-full border border-rule bg-surface/80 p-0.5"
    >
      {choices.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`${label} theme`}
          aria-pressed={preference === value}
          title={`${label} theme`}
          onClick={() => changePreference(value as ThemePreference)}
          className="theme-choice flex h-10 w-10 items-center justify-center rounded-full text-muted-ink hover:text-ink aria-pressed:bg-blue aria-pressed:text-on-blue"
        >
          <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
