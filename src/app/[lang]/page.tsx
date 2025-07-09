import { getDictionary } from "../lib/dictionaries";
import { Locale } from "@/app/lib/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="">{t.welcome}</p>
      {t.description}
    </main>
  );
}
