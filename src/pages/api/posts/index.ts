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
      // 得到分页参数，转成数字类型
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      console.log("🚀 ~ file: index.ts:18 ~ handler ~ skip:", skip);
      let posts;
      // user's posts
      const hasMore = (await prisma.post.count()) > skip + Number(limit);
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: Number(limit),
        });
        return res.status(200).json({ posts, hasMore });
      } else {
        // all posts
        const hasMore = (await prisma.post.count()) > skip + Number(limit);
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: skip,
          take: Number(limit),
        });
      }
      return res.status(200).json({ posts, hasMore });
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
