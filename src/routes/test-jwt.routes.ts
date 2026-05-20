import { Router, type Request, type RequestHandler, type Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { generateToken } from "../utils/jwt";
import { authenticateToken, type AuthRequest } from "../middlewares/auth.middleware";

async function userHasPermission(
  prisma: PrismaService,
  userId: number,
  resource: string,
  action: string,
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      roles: {
        select: {
          role: {
            select: {
              permissions: {
                select: {
                  permission: {
                    select: {
                      resource: true,
                      action: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  return user.roles.some((userRole) =>
    userRole.role.permissions.some(
      (rolePermission) =>
        rolePermission.permission.resource === resource &&
        rolePermission.permission.action === action,
    ),
  );
}

export default function createTestJwtRoutes(prisma: PrismaService): Router {
  const router = Router();

  const crearToken: RequestHandler = (req: Request, res: Response): void => {
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

  const setupRbac: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const userId: number = Number(req.params.userId);

    if (Number.isNaN(userId)) {
      res.status(400).json({
        message: "El userId debe ser un número",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
      });
      return;
    }

    const role = await prisma.role.upsert({
      where: {
        name: "USER",
      },
      create: {
        name: "USER",
        description: "Usuario normal de la aplicación Tinder",
      },
      update: {},
    });

    const permission = await prisma.permission.upsert({
      where: {
        resource_action: {
          resource: "profiles",
          action: "read",
        },
      },
      create: {
        name: "profiles:read",
        resource: "profiles",
        action: "read",
        description: "Permite ver perfiles",
      },
      update: {},
    });

    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: role.id,
        },
      },
      create: {
        userId: user.id,
        roleId: role.id,
      },
      update: {},
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: role.id,
          permissionId: permission.id,
        },
      },
      create: {
        roleId: role.id,
        permissionId: permission.id,
      },
      update: {},
    });

    res.json({
      message: "RBAC configurado correctamente",
      userId: user.id,
      role: role.name,
      permission: permission.name,
    });
  };

  const rutaProtegida: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      res.status(401).json({
        message: "Usuario no autenticado",
      });
      return;
    }

    const allowed = await userHasPermission(
      prisma,
      userId,
      "profiles",
      "read",
    );

    if (!allowed) {
      res.status(403).json({
        message: "No tienes permiso para acceder a este recurso",
      });
      return;
    }

    res.json({
      message: "Acceso permitido",
      userId,
      permiso: "profiles:read",
    });
  };

  router.get("/crear-token/:userId", crearToken);
  router.post("/setup-rbac/:userId", setupRbac);
  router.get("/protegida", authenticateToken, rutaProtegida);

  return router;
}