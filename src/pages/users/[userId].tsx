import { useRouter } from "next/router";
// import { ClipLoader } from 'react-spinners';
import useUser from "@/hooks/useUser";
import usePosts from "@/hooks/usePosts";

import Header from "@/components/Header";
import UserHero from "@/components/user/UserHero";
import UserBio from "@/components/user/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);
  const { data: posts = [] } = usePosts(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <ClipLoader
          color='lightblue'
          size={80}
        /> */}
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
      <PostFeed posts={posts} />
    </div>
  );
};

export default UserView;
