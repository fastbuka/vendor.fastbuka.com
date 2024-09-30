import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { comparePassword } from '@/utils/matchpassword'
import { setTokenCookie } from '@/utils/cookies'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const SECRET_KEY = process.env.JWT_SECRET as string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const isMatch = await comparePassword(password, user.password)

      if (isMatch) {
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, {
          expiresIn: '1d',
        })

        setTokenCookie(res, token)

        res.status(200).json({ message: 'Login successful', token })
      } else {
        res.status(401).json({ error: 'Invalid password' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
