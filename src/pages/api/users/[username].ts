import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      throw new Error('Invalid Username');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) throw new Error('Invalid Username');

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: existingUser.id,
        },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
