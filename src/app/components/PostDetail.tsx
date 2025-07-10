import Image from "next/image";
import { PostType } from "@/app/types/PostType";



export function PostDetail({ post }: { post: PostType }) {
  return (
    <article className=" rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="relative w-full h-64">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className=" text-base leading-relaxed">{post.body}</p>
      </div>
    </article>
  );
}
