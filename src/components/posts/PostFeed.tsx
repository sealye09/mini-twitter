import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import usePosts from "@/hooks/fetcher/usePosts";
import VirtualList from "../VirtualList";

const PostFeed = () => {
  const router = useRouter();
  const userId = (router.query.userId as string) || "";

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [posts, setPosts] = useState<any[]>([]);
  const { data, isLoading, hasMore } = usePosts({ userId, page, limit });

  const handleScrollEnd = () => {
    if (!hasMore) return;
    setPage((prev) => prev + 1);
    console.log("handleScrollEnd");
  };

  // TODO: 优化
  // 添加新的 posts
  useEffect(() => {
    if (!data) return;

    setPosts((prev) => [...prev, ...data]);
  }, [userId, page, limit, isLoading]);

  // userId 变化时，重置 posts
  useEffect(() => {
    setPosts([...data]);
    setPage(1);
    setLimit(10);
  }, [userId]);

  return (
    <VirtualList
      items={posts}
      estimatedItemHeight={110}
      prevCount={2}
      nextCount={2}
      onScrollEnd={handleScrollEnd}
      containerHeight={650}
      containerWidth={574}
      hasMore={hasMore}
      loading={isLoading}
    />
  );
};

export default PostFeed;
