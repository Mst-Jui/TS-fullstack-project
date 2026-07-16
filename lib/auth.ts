import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// Read current user from cookie (server components / route handlers)
export function getCurrentUser(): TokenPayload | null {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
