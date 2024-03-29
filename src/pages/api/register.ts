import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { username, password, name, email } = req.body;

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
        name: name,
        email: email,
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
