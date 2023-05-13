import { Post, User } from "@prisma/client";

export type PostFeed = Post & {
  user: User;
  comments: Comment[];
};

type CommentWithUser = Comment & {
  user: User;
};

export type PostDetail = Post & {
  user: User;
  comments: CommentWithUser[];
};
