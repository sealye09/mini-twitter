import useSWR from "swr";
import { User } from "@prisma/client";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR<User>("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
