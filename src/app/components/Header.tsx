"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useT } from "@/app/providers/LangContext";

type HeaderProps = {
  welcomeMessage: string;
  themeLabels: {
    light: string;
    dark: string;
  };
};

export default function Header({ welcomeMessage, themeLabels }: HeaderProps) {
  const t = useT();
  return (
    <header className="w-full px-4 py-3 border-b border-gray-200  flex items-center justify-between bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle labels={themeLabels} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{welcomeMessage}</span>
        <Link
          href="/post/new"
          className="text-sm font-medium px-3 py-1 rounded-md border bg-blue-400"
        >
          {t.newPost}
        </Link>
      </div>
    </header>
  );
}
