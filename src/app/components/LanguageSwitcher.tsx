'use client';

import { usePathname, useRouter } from 'next/navigation';

const locales = ['en', 'es'] as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locales.find(locale =>
    pathname.startsWith(`/${locale}`)
  ) ?? 'en';

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLocale(e.target.value)}
      className="p-1 cursor-pointer rounded bg-transparent border border-gray-300 dark:border-gray-700 text-sm"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
