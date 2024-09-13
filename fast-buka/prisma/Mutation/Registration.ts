import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password, phone, address, image, categories } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          phone,
          address,
          image,
          categories,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Registration failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
