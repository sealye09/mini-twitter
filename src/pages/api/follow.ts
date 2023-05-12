import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;
    console.log(req.body);

    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid userId");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid userId. Can't find the user");
    }

    let updatedFollowerIds = [...(user.followerIds || [])];
    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(user.id);
      updatedFollowerIds.push(user.id);
      // NOTIFICATION PART START
      //       try {
      //         await prisma.notification.create({
      //           data: {
      //             content: 'Someone followed you!',
      //             userId,
      //           },
      //         });
      //
      //         await prisma.user.update({
      //           where: {
      //             id: userId,
      //           },
      //           data: {
      //             hasNotification: true,
      //           },
      //         });
      //       } catch (error) {
      //         console.log(error);
      //       }
      // NOTIFICATION PART END
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== user.id,
      );
      updatedFollowerIds = updatedFollowerIds.filter(
        (followerId) => followerId !== user.id,
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followerIds: updatedFollowerIds,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
