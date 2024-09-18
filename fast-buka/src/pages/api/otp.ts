import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type OTPData = {
  otp: string;
  expiresAt: number;
};

let savedOTPS: Record<string, OTPData> = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const OTP_EXPIRATION_MS = 60 * 1000;

const sendOTP = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  const digits = '0123456789';
  const limit = 4;
  let otp = '';
  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  savedOTPS[email] = {
    otp,
    expiresAt: Date.now() + OTP_EXPIRATION_MS,
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP',
    html: `
      <p>DO NOT DISCLOSE!</p>
      <p>Enter ${otp} to verify your email address.</p>
      <p>Best Regards,</p>
      <p>The FastBuka Support Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log("Failed to send Email: ", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

const verifyOTP = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;
  const enteredOTP = req.body.otp;

  const savedData = savedOTPS[email];

  if (savedData) {
    const { otp, expiresAt } = savedData;
    const currentTime = Date.now();

    if (currentTime > expiresAt) {
      delete savedOTPS[email];
      res.status(400).json({ message: "OTP has expired" });
      return;
    }

    if (otp === enteredOTP) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } else {
    res.status(400).json({ message: "OTP not found" });
  }
};

const handleOTPRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { action } = req.query;

  if (req.method === 'POST') {
    if (action === 'send') {
      await sendOTP(req, res);
    } else if (action === 'verify') {
      await verifyOTP(req, res);
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handleOTPRequest;
