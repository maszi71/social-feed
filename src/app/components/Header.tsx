"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  welcomeMessage: string;
  themeLabels: {
    light: string;
    dark: string;
  };
};

export default function Header({ welcomeMessage, themeLabels }: HeaderProps) {
  return (
    <header className="w-full px-4 py-3 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle labels={themeLabels} />
      </div>
      <div className="text-sm font-medium">{welcomeMessage}</div>
    </header>
  );
}
