import React, { FC } from "react";
import { PostFeed as Feed, PostDetail } from "@/types";

import FeedItem from "./FeedItem";

interface FeedProps {
  feedData: Feed[] | PostDetail[];
  isComment?: boolean;
}

const Feed: FC<FeedProps> = ({ feedData }) => {
  return (
    <div className="w-full">
      {feedData.map((post) => (
        <FeedItem post={post} />
      ))}
    </div>
  );
};

export default Feed;
