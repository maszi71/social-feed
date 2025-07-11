"use client";

import Image from "next/image";
import { PostType } from "@/app/types/PostType";
import Link from "next/link";
import { useLang } from "@/app/providers/LangContext";

export function Post({ post }: { post: PostType; }) {
   const lang = useLang();
  return (
    <div className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden ransition-colors duration-300">
      <Link href={`/${lang}/post/${post.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600  text-sm leading-relaxed">{post.body}</p>
        </div>
      </Link>
    </div>
  );
}
