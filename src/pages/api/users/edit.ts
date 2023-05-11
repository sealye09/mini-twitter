import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, avatarUrl, coverImageUrl } = req.body;

    if (!username || !name) {
      throw new Error('Missing Fields');
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        avatarUrl,
        coverImageUrl,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
