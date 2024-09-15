import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const verifyToken = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
};
