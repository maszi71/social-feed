'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '@/app/lib/i18n-config';

const locales = i18n['locales'];

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
