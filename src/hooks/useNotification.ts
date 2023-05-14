import useSWR from "swr";
import { Notification } from "@prisma/client";
import fetcher from "@/libs/fetcher";
import useCurrentUser from "./useCurrentUser";
import axios from "axios";
import { useCallback } from "react";

const useNotification = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    currentUser ? `/api/notifications/${currentUser.id}` : null,
    fetcher,
  );

  const readNotifications = useCallback(async () => {
    if (currentUser) {
      await axios.patch("/api/users/read_notifications", { userId: currentUser.id });
      mutateCurrentUser();
    }
  }, [currentUser]);

  return {
    data,
    error,
    isLoading,
    mutate,
    readNotifications,
  };
};

export default useNotification;
