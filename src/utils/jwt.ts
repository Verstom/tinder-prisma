import * as jwt from "jsonwebtoken";
import type { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? "super-secret-change-this";

export interface TokenPayload extends JwtPayload {
  userId: number;
}

export function generateToken(userId: number): string {
  const payload: TokenPayload = {
    userId,
  };

  const options: SignOptions = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Token inválido");
  }

  if (typeof decoded.userId !== "number") {
    throw new Error("El token no contiene un userId válido");
  }

  return decoded as TokenPayload;
}