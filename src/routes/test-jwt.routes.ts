import { Router, type RequestHandler } from "express";
import { generateToken } from "../utils/jwt";
import { authenticateToken, type AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

const crearToken: RequestHandler = (req, res): void => {
  const userId: number = Number(req.params.userId);

  if (Number.isNaN(userId)) {
    res.status(400).json({
      message: "El userId debe ser un número",
    });
    return;
  }

  const token: string = generateToken(userId);

  res.json({
    message: "Token generado correctamente",
    token,
  });
};

const rutaProtegida: RequestHandler = (req, res): void => {
  const authReq = req as AuthRequest;

  res.json({
    message: "Entraste a una ruta protegida",
    usuario: authReq.user,
  });
};

router.get("/crear-token/:userId", crearToken);
router.get("/protegida", authenticateToken, rutaProtegida);

export default router;