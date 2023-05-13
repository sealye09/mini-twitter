import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("Invaild UserId");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
