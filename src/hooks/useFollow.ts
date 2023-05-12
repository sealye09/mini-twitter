import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      toast.error("Not Login");
      return;
    }

    try {
      let request;
      if (isFollowing) {
        request = () =>
          axios.delete("/api/follow", { data: { userId: userId } });
      } else {
        request = () => axios.post("/api/follow", { userId: userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
