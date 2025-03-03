import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Sessions from "../models/sessions";
import Roles from "../models/roles";

const verifyToken =
  (rols: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["token"];

      if (!token) {
        res.status(401).json({ message: "No se ha enviado el token" });
        return;
      }

      const getToken = await Sessions.findOne({ where: { token, status: 1 } });

      if (!getToken) {
        res.status(401).json({ message: "Token no válido" });
        return;
      }

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(
          token as string,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
      } catch (err) {
        res.status(401).json({ message: "Token no válido" });
        return;
      }

      req.body.decoded = decoded;

      const rol = await Roles.findByPk(req.body.decoded.rol);
      if (!rol) {
        res.status(403).json({ message: "Rol no encontrado" });
        return;
      }

      if (!rols.includes(rol?.getDataValue("rol"))) {
        res
          .status(403)
          .json({ message: "No tiene permisos para realizar esta acción" });
        return;
      }

      return next();
    } catch (err) {
      res
        .status(500)
        .json({ message: `Error en el servidor: ${(err as Error).message}` });
      return;
    }
  };

export default verifyToken;
