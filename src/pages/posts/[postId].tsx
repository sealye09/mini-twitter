import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import Post from "@/components/posts/Post";
import Loader from "@/components/Loader";
import CommentFeed from "@/components/posts/CommentFeed";
import useComments from "@/hooks/useComments";
import PostCreator from "@/components/posts/PostCreator";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading: postsIsLoading } = usePost(postId as string);
  const { data: fetchedComments, isLoading: commentsIsLoading } = useComments(postId as string);

  return (
    <div className="min-h-screen">
      <Header
        showBackArrow
        label="Tweet"
      />
      {postsIsLoading || !fetchedPost ? (
        <Loader />
      ) : (
        <>
          <Post post={fetchedPost} />
          <PostCreator
            placeholder="Your reply..."
            postId={postId as string}
            isComment
          />
        </>
      )}

      {commentsIsLoading || !fetchedComments ? (
        <Loader />
      ) : (
        <CommentFeed comments={fetchedComments} />
      )}
    </div>
  );
};

export default PostView;
