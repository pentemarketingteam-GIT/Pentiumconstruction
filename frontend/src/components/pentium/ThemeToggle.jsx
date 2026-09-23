import { Sun, Moon } from "lucide-react";
import { usePentiumTheme } from "@/lib/PentiumTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = usePentiumTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      data-testid="pen-theme-toggle"
      className={`grid h-10 w-10 place-items-center rounded-full transition ${className}`}
      style={{ border: "1px solid var(--pen-border)", background: "var(--pen-surface)", color: "var(--pen-gold-2)" }}
    >
      {dark ? <Sun className="h-4 w-4" strokeWidth={1.8} /> : <Moon className="h-4 w-4" strokeWidth={1.8} />}
    </button>
  );
}
