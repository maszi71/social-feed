"use client";

import { useTheme } from "@/app/providers/ThemeProvider";

type ThemeLabels = {
  light: string;
  dark: string;
};

export default function ThemeToggle({ labels }: { labels: ThemeLabels }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-sm border rounded cursor-pointer border-gray-300 dark:border-gray-700  transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? labels.dark : labels.light}
    </button>
  );
}
