import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import usePosts from "@/hooks/fetcher/usePosts";
import { useScrollEnd } from "@/hooks/useScrollEnd";
import Loader from "@/components/Loader";

import Post from "./Post";

const PostFeed = () => {
  const router = useRouter();
  const userId = (router.query.userId as string) || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [posts, setPosts] = useState<any[]>([]);
  const { data, isLoading, hasMore } = usePosts({ userId, page, limit });

  useScrollEnd(() => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    if (data) {
      setPosts((prev) => [...prev, ...data]);
    }
  }, [data, page]);

  return (
    <div className="w-full">
      {posts.map((post) => (
        <Post
          post={post}
          key={post.id}
        />
      ))}

      {isLoading && <Loader />}
      {!hasMore && !isLoading && (
        <div className="text-center py-8 text-lg font-bold">No more posts</div>
      )}
    </div>
  );
};

export default PostFeed;
