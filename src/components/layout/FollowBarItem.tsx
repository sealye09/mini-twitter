import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

import useFollow from "@/hooks/fetcher/useFollow";
import Avatar from "@/components/user/Avatar";

interface FollowBarItemProps {
  userId: string;
  avatarUrl: any;
  name: string;
  username: string;
}

const FollowBarItem: FC<FollowBarItemProps> = ({ userId, avatarUrl, name, username }) => {
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const goToUser = useCallback(() => {
    router.push({
      pathname: "/users/" + userId,
    });
  }, []);

  return (
    <div
      className="flex items-center hover:cursor-pointer"
      onClick={goToUser}
    >
      <Avatar
        src={avatarUrl}
        className="h-8 w-8"
      />
      <div className="flex flex-col items-start justify-between px-4 w-full">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-sm text-neutral-500">@{username}</p>
      </div>
      <button
        className="btn btn-primary capitalize btn-sm rounded-full"
        onClick={(event) => {
          event.stopPropagation();
          toggleFollow();
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowBarItem;
