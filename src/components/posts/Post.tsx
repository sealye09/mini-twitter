import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { MdOutlineMoreHoriz } from "react-icons/md";

import { PostFeed } from "@/types";
import useCurrentUser from "@/hooks/fetcher/useCurrentUser";
import useLike from "@/hooks/fetcher/useLike";
import Avatar from "@/components/user/Avatar";

interface PostProps {
  post: PostFeed;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: post.id, userId: currentUser?.id });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${post.userId}`);
    },
    [router, currentUser?.id],
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
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
      className="border-b-[1px] border-base-300 p-4 hover:bg-base-200 transition cursor-pointer"
    >
      <div className="flex flex-row items-start gap-4 w-full">
        <div
          className="min-w-fit w-12 h-12"
          onClick={goToUser}
        >
          <Avatar
            className="w-12 h-12"
            src={post.user.avatarUrl}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
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
              {currentUser?.id === post.userId && (
                <div
                  className="hover:bg-sky-200 hover:text-sky-500 rounded-full p-2 flex justify-center items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("more");
                  }}
                >
                  <MdOutlineMoreHoriz size={20} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-1">
            <p>{post.content}</p>
          </div>
          <div className="flex flex-row items-center gap-6 -ml-2">
            <div className="group flex flex-row items-center text-neutral-500 cursor-pointer transition hover:text-sky-500">
              <div className="p-2 group-hover:bg-sky-200 rounded-full w-full">
                <AiOutlineMessage size={20} />
              </div>
              <p>{post.comments.length === 0 ? null : post.comments.length}</p>
            </div>

            <div
              onClick={onLike}
              className="group flex flex-row items-center text-neutral-500 cursor-pointer transition hover:text-red-500"
            >
              <div className="group-hover:bg-red-200 p-2 rounded-full">
                <LikeIcon
                  className={`${hasLiked ? "text-red-500" : ""}`}
                  size={20}
                />
              </div>
              <p className={`${hasLiked ? "text-red-500" : ""}`}>
                {post.likedIds.length === 0 ? null : post.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
