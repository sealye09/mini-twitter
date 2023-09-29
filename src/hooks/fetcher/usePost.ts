import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { PostFeed } from "@/types";

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR<PostFeed>(
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
