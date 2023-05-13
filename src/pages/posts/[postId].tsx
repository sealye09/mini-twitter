import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";
import { PostFeed as PostType } from "@/types";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import PostFeed from "@/components/posts/PostFeed";
import Loader from "@/components/Loader";

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
      <PostItem post={fetchedPost as PostType} />
      <PostFeed posts={[]} />
      {/* <CommentFeed comments={fetchedPost?.comments} /> */}
    </div>
  );
};

export default PostView;
