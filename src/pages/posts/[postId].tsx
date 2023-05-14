import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";
import { PostFeed as PostType } from "@/types";
import Header from "@/components/Header";
import FeedItem from "@/components/posts/FeedItem";
import Feed from "@/components/posts/Feed";
import Loader from "@/components/Loader";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        showBackArrow
        label="Tweet"
      />
      <FeedItem post={fetchedPost as PostType} />
      <Feed feedData={[]} />
      <CommentFeed />
    </div>
  );
};

export default PostView;
