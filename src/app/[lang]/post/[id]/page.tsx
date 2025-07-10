import { getDictionary } from "@/app/lib/dictionaries";
import Link from "next/link";
import { PostDetail } from "@/app/components/PostDetail";
import { CommentsSection } from "@/app/components/CommentsSection";
import { PostType } from "@/app/types/PostType";
import { CommentType } from "@/app/types/CommentType";
import { Locale } from "@/app/lib/i18n-config";


async function getPost(id: string): Promise<PostType> {
  const res = await fetch(
    `https://686faf3e91e85fac42a2196f.mockapi.io/api/v1/posts/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

async function getComments(postId: string): Promise<CommentType[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string; lang: Locale};
}) {
  const { id, lang } = params;
  const post = await getPost(id);
  const comments = await getComments(id);
  const t = await getDictionary(lang);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <PostDetail post={post} />
      <CommentsSection comments={comments} title={t.comments} />
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
