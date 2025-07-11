"use client";

import { useState } from "react";
import { PostPreview } from "./PostPreview";
import { useT } from "@/app/providers/LangContext";

export type PostFormData = {
  title: string;
  image: string;
  body: string;
};

type Props = {
  onSubmit: (data: PostFormData) => void;
  isSubmitting: boolean;
};

export function PostForm({ onSubmit, isSubmitting }: Props) {
  const t = useT();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, image, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full p-2 border border-gray-300 rounded"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <textarea
        placeholder="Write your post..."
        className="w-full p-2 border border-gray-300 rounded min-h-[150px]"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded  disabled:opacity-50"
      >
        {isSubmitting ? `${t.submitting}` : `${t.createPostTitle}`}
      </button>

      <PostPreview title={title} image={image} body={body} />
    </form>
  );
}
