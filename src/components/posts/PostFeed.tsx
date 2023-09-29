import { useRouter } from "next/router";

import usePosts from "@/hooks/fetcher/usePosts";
import { useScrollEnd } from "@/hooks/useScrollEnd";
import Loader from "@/components/Loader";

import Post from "./Post";
import { useEffect } from "react";

const PostFeed = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const limit = Number(router.query.limit) || 10;
  const userId = (router.query.userId as string) || "";

  const { data: posts = [], isLoading } = usePosts({ userId, page, limit });
  const isBottom = useScrollEnd();

  useEffect(() => {
    if (isBottom) {
      router.push({ pathname: "/", query: { page: page + 1, limit, userId } });
    }
  }, [isBottom]);

  if (!posts || isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
      {isBottom && <Loader />}
    </div>
  );
};

export default PostFeed;
