import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        
        if (!email ||!password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
 
        const UpdatePass = await prisma.user.update({
            where:{email},
        data: {password: hashedPassword},
    })

    res.status(200).json(UpdatePass);
        
}else{
    res.status(405).json({ message: 'Method not allowed' });
}
}