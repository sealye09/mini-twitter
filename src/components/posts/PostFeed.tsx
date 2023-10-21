import { useRouter } from "next/router";

import usePosts from "@/hooks/fetcher/usePosts";
import VirtualList from "../VirtualList";

const PostFeed = () => {
  const router = useRouter();
  const userId = (router.query.userId as string) || "";

  const { data, isLoading, hasMore, nextPage } = usePosts({ userId, limit: 10 });

  return (
    <VirtualList
      items={data}
      estimatedItemHeight={110}
      prevCount={5}
      nextCount={5}
      onScrollEnd={nextPage}
      containerHeight={650}
      hasMore={hasMore}
      loading={isLoading}
    />
  );
};

export default PostFeed;
