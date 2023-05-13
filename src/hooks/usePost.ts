import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { Post } from "@prisma/client";

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Post>(
    postId ? `/api/posts/${postId}` : null,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
