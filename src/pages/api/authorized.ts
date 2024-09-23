import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/utils/auth'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = verifyToken(req, res);

  if (!user) return;

  res.status(200).json({ message: 'This is protected content' });
}
