import { FC, useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";
// import useFollow from '@/hooks/useFollow';

interface UserBioProps {
  userId: string;
}

const UserBio: FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow } = useFollow(userId);

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-base-300 pb-2">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <button
            className="btn btn-secondary capitalize rounded-full"
            onClick={() => {
              editModal.onOpen();
            }}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-secondary capitalize rounded-full"
            onClick={() => {
              toggleFollow();
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="p-4 pt-8 flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div>
          <p className="">{fetchedUser?.bio}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex flex-row justify-start gap-2 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row items-center gap-1">
              <p className="">{fetchedUser?.followingIds.length}</p>
              <p className="text-neutral-500">Following</p>
            </div>
            <div className="flex flex-row items-center gap-1">
              {/* TODO FOLOWERS COUNTS */}
              <p className="">{fetchedUser?.followerIds.length}</p>
              <p className="text-neutral-500">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
