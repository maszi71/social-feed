"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/app/lib/api";
import { CommentType } from "@/app/types/CommentType";

type Props = {
  postId: string;
  title: string;
};

export function CommentsSection({ postId, title }: Props) {
  const { data, isLoading, error } = useQuery<CommentType[]>({
    queryKey: ["comments", postId],
    queryFn: () =>
      apiFetch<CommentType[]>(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        { absolute: true }
      ),
  });

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Failed to load comments.</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold my-4">{title}</h2>
      <div className="space-y-4">
        {data!.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg border border-gray-200"
          >
            <p className="text-sm font-medium">{comment.name}</p>
            <p className="text-xs">{comment.email}</p>
            <p className="mt-2 text-sm">{comment.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
