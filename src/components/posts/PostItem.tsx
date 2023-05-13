import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import { PostFeed } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";
import Avatar from "../user/Avatar";

interface PostItemProps {
  post: PostFeed;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: post.id, userId: currentUser?.id });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${currentUser?.id}`);
    },
    [router, currentUser?.id],
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        toast.error("Not Login");
        return;
      }

      toggleLike();
    },
    [currentUser, toggleLike],
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!post.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-base-300 p-5 cursor-pointer hover:bg-base-300 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <div onClick={goToUser}>
          <Avatar
            className="w-12 h-12"
            src={post.user.avatarUrl}
          />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="font-semibold cursor-pointer hover:underline"
            >
              {post.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{post.user.username}
            </span>
            <span className="text-neutral-500 text-sm"> {createdAt} ago</span>
          </div>
          <div className="mt-1">{post.content}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{post.comments.length}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon
                color={hasLiked ? "red" : ""}
                size={20}
              />
              <p>{post.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
