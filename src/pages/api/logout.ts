import type { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@/utils/cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    removeTokenCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
