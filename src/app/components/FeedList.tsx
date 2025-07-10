"use client";

import { usePosts } from "../hooks/usePosts";
import { Post } from "./Post";
import { PostSkeleton } from "./PostSkeleton";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { PostType } from "../types/PostType";
import { Locale } from "../lib/i18n-config";

export default function FeedList({ endMessage , lang }: { endMessage?: string , lang: Locale }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts();
  const loaderRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    true,
    { threshold: 1.0 }
  );

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.pages.map((page) =>
        page.map((post: PostType) => <Post lang={lang} key={post.id} post={post} />)
      )}

      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}

      <div ref={loaderRef} />

      {!hasNextPage && (
        <p className="text-center text-gray-500 my-4">{endMessage}</p>
      )}
    </div>
  );
}
