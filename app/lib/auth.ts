import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET || "SECRET!@#";

//helper functions for auth

interface TokenPayload {
  id: string;
  role: string
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  return jwt.verify(token, SECRET) as TokenPayload;
};
