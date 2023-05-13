import React, { FC } from "react";
import { PostFeed } from "@/types";

import PostItem from "./PostItem";

interface PostFeedProps {
  posts: PostFeed[];
}

const PostFeed: FC<PostFeedProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
