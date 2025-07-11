import FeedList from "@/app/components/FeedList";
import { getDictionary } from "@/app/lib/dictionaries";
import { Locale } from "@/app/lib/i18n-config";

export default async function FeedPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t.feedTitle}</h1>
      <FeedList endMessage={t.endMessage} />
    </main>
  );
}
