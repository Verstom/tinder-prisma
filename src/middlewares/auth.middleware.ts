import type { Request, RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import type { TokenPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const authenticateToken: RequestHandler = (req, res, next): void => {
  const authHeader: string | undefined = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Token no enviado",
    });
    return;
  }

  const token: string | undefined = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Token no válido",
    });
    return;
  }

  try {
    const payload: TokenPayload = verifyToken(token);
    (req as AuthRequest).user = payload;
    next();
  } catch {
    res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
};