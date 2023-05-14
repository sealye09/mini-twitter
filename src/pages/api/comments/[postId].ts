import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== "string" || postId === "undefined") {
      throw new Error("Invalid PostID");
    }
    // get comments
    if (req.method === "GET") {
      let comments;
      comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        include: {
          user: true,
          post: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(comments);
    }

    // create post
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { content } = req.body;

      const comment = await prisma.comment.create({
        data: {
          content: content,
          userId: currentUser.id,
          postId: postId,
        },
      });

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              content: `${currentUser.username} replied on your tweet!`,
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json(comment);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
