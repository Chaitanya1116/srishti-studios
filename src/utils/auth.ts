import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const JWT_SECRET = process.env.JWT_SECRET || 'srishti-secret-2026-key';

export const verifyAuth = (req: NextRequest): { username: string; role: string } | null => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string };
  } catch (err) {
    return null;
  }
};
