import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { PostFeed } from "@/types";

type UsePostsQuery = {
  userId?: string;
  page?: number;
  limit?: number;
};

const usePosts = ({ userId, page = 1, limit = 10 }: UsePostsQuery) => {
  const url = userId
    ? `/api/posts?userId=${userId}&page${page}&limit=${limit}`
    : `/api/posts?page${page}&limit=${limit}`;
  const { data, error, isLoading, mutate } = useSWR<PostFeed[]>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;