import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // get posts
    if (req.method === "GET") {
      const { userId } = req.query;
      let posts;
      // user's posts
      if (!!userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            id: userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
    // create post
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { content } = req.body;

      const post = await prisma.post.create({
        data: {
          content,
          userId: currentUser.id,
        },
      });
      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
