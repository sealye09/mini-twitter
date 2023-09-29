import useSWR from "swr";

import fetcher from "@/libs/fetcher";
import { CommentFeed } from "@/types";

const useComments = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<CommentFeed[]>(
    `/api/comments/${userId}`,
    fetcher,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useComments;
