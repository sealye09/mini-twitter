import React, { FC } from "react";
import { PostFeed } from "@/types";

import PostItem from "./PostItem";

interface PostFeedProps {
  posts: PostFeed[];
  more?: boolean;
}

const PostFeed: FC<PostFeedProps> = ({ posts, more }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
