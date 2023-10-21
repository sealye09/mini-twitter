import { useRouter } from "next/router";
import useUser from "@/hooks/fetcher/useUser";

import Header from "@/components/layout/Header";
import UserHero from "@/components/user/UserHero";
import UserBio from "@/components/user/UserBio";
import PostFeed from "@/components/posts/PostFeed";
import Loader from "@/components/Loader";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="user-view min-h-screen">
      <Header
        showBackArrow
        label={fetchedUser?.name}
      />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed />
    </div>
  );
};

export default UserView;
