import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import usePost from "./usePost";
import usePosts from "./usePosts";
import useCurrentUser from "./useCurrentUser";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id as string);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      toast.error("Not Login");
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.post("/api/cancel_like", { postId });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
