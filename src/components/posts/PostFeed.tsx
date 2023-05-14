import React, { FC } from "react";
import { CommentFeed, PostFeed as PostFeed, PostDetail } from "@/types";

import Post from "./Post";

interface PostFeedProps {
  posts: PostFeed[];
}

const PostFeed: FC<PostFeedProps> = ({ posts }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
