import React, { FC } from "react";
import { CommentFeed } from "@/types";

import Comment from "./Comment";

interface CommentFeedProps {
  comments: CommentFeed[];
}

const CommentFeed: FC<CommentFeedProps> = ({ comments }) => {
  return (
    <div className="w-full h-full">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default CommentFeed;
