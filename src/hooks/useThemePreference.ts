import { useEffect, useState } from "react";

const STORAGE_KEY = "learn-ai-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return false;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "dark") return true;
  if (saved === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useThemePreference() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  return { dark, setDark };
}
