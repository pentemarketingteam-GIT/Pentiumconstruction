import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function PentiumThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("pentium_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("pentium_theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div data-pen-theme={theme} style={{ minHeight: "100%" }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function usePentiumTheme() {
  return useContext(ThemeContext);
}
