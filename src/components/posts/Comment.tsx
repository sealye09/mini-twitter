import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { MdOutlineMoreHoriz } from "react-icons/md";

import { CommentFeed } from "@/types";
import useCurrentUser from "@/hooks/fetcher/useCurrentUser";
import Avatar from "@/components/user/Avatar";

interface CommentProps {
  comment: CommentFeed;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${currentUser?.id}`);
    },
    [router, currentUser?.id],
  );

  const createdAt = useMemo(() => {
    if (!comment.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);

  return (
    <div className="border-b-[1px] border-base-300 p-4 hover:bg-base-200 transition cursor-pointer">
      <div className="flex flex-row items-start gap-4 w-full">
        <div
          className="min-w-fit w-12 h-12"
          onClick={goToUser}
        >
          <Avatar
            className="w-12 h-12"
            src={comment.user.avatarUrl}
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
                  {comment.user.name}
                </p>
                <span
                  onClick={goToUser}
                  className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
                >
                  @{comment.user.username}
                </span>
                <span className="text-neutral-500 text-sm"> {createdAt} ago</span>
              </div>
              {currentUser?.id === comment.userId && (
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
            <p>{comment.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
