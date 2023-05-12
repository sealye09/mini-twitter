import { useRouter } from "next/router";
import { FC } from "react";

import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";
import useFollow from "@/hooks/useFollow";
import FollowBarItem from "./FollowBarItem";

interface FollowBarProps {}

const FollowBar: FC<FollowBarProps> = () => {
  const { data: users } = useUsers();

  if (!users || users.length === 0) {
    return <div className="fixed"></div>;
  }
  return (
    <div className="fixed my-8 h-fit bg-base-200 shadow-xl rounded-box">
      <div className="card">
        <div className="card-body flex-col gap-6 justify-start">
          <h2 className="card-title">New Users</h2>
          {users.map((user) => (
            <FollowBarItem
              key={user.id}
              userId={user.id}
              avatarUrl={user.avatarUrl}
              name={user.name}
              username={user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
