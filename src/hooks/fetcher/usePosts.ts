import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { PostFeed } from "@/types";

const usePosts = ({ userId = "", limit = 10 }) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<PostFeed[]>([]);

  const url =
    userId === ""
      ? `/api/posts?page=${page}&limit=${limit}`
      : `/api/posts?userId=${userId}&page=${page}&limit=${limit}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    { posts: any[] } & { hasMore: boolean }
  >(url, fetcher);

  // 是否还有更多数据
  const hasMore = useMemo(() => {
    return data?.hasMore || false;
  }, [data]);

  const nextPage = useCallback(() => {
    console.log("nextPage");
    setPage((page) => page + 1);
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  // 添加新的 post
  useEffect(() => {
    if (!data) return;

    setPosts((prev) => prev.concat(data.posts));
  }, [data]);

  // userId 变化时，重置 posts
  useEffect(() => {
    if (!data) return;

    setPosts(data.posts);
    resetPage();
  }, [userId]);

  return {
    data: posts,
    hasMore,
    error,
    isLoading,
    mutate,
    page,
    nextPage,
  };
};

export default usePosts;
