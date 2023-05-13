import useSWR from "swr";
import { Notification } from "@prisma/client";
import fetcher from "@/libs/fetcher";

const useNotification = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    userId ? `/api/notifications/${userId}` : null,
    fetcher,
  );

  console.log(data);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotification;
