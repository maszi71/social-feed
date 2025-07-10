// app/feed/hooks/usePosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://686faf3e91e85fac42a2196f.mockapi.io/api/v1/posts?page=${pageParam}&limit=10`
  );
  return res.json();
};

export const usePosts = () =>
  useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) =>
  allPages.length < 10 ? allPages.length + 1 : undefined,
  });
