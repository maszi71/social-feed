import { getDictionary } from "@/app/lib/dictionaries";
import Link from "next/link";
import { PostDetail } from "@/app/components/PostDetail";
import { CommentsSection } from "@/app/components/CommentsSection";
import { Locale } from "@/app/lib/i18n-config";
import { apiFetch } from "@/app/lib/api";
import { PostType } from "@/app/types/PostType";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const { id, lang } = params;
  const t = await getDictionary(lang);

  const post = await apiFetch<PostType>(`/posts/${id}`);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <PostDetail post={post} />
      <CommentsSection postId={id} title={t.comments} />
      <div className="mt-6">
        <Link
          href={`/${lang}/feed`}
          className="text-sm text-center hover:underline"
        >
          {t.backToFeed}
        </Link>
      </div>
    </main>
  );
}
