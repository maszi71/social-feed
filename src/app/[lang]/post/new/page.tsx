"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PostType } from "@/app/types/PostType";
import { apiFetch } from "@/app/lib/api";
import { PostForm } from "@/app/components/PostForm";

export default function CreatePostPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: Omit<PostType, "id">) =>
      apiFetch<PostType>("/posts", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      router.push("/feed");
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create New Post</h1>

      <PostForm onSubmit={mutation.mutate} isSubmitting={mutation.isPending} />

      {mutation.isError && (
        <p className="text-red-500">Error creating post. Try again.</p>
      )}
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline mt-4"
      >
        ← Back
      </button>
    </div>
  );
}
