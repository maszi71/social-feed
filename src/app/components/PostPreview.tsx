"use client";

import Image from "next/image";
import { useT } from "../providers/LangContext";

type Props = {
  title: string;
  image: string;
  body: string;
};

export function PostPreview({ title, image, body }: Props) {
  const t = useT();
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-2">{t.livePreview}</h2>
      <div className="border rounded p-4 space-y-2">
        <h3 className="text-xl font-bold">{title || "Post title here"}</h3>

        {image ? (
          <div className="relative w-full h-64">
            <Image
              src={image}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ) : null}

        <p className="whitespace-pre-line">
          {body || `${t.postBodyPlaceholder}`}
        </p>
      </div>
    </div>
  );
}
