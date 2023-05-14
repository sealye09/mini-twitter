import React, { FC } from "react";
import PostCreator from "./PostCreator";
import Feed from "./Feed";

interface CommentFeedProps {}

const CommentFeed: FC<CommentFeedProps> = ({}) => {
  return (
    <div className="w-full h-full">
      <PostCreator
        placeholder="Your reply..."
        isComment
      />
      <Feed
        feedData={[]}
        isComment
      />
    </div>
  );
};

export default CommentFeed;
