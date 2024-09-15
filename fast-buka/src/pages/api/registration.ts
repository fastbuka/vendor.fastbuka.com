import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, city, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          city,
          password: hashedPassword,
        },
      });

      res.status(201).json(newUser);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(400).json({ error: 'Registration failed' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
