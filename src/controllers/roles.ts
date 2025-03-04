import { Request, Response } from "express";
import Roles from "../models/roles";

export const getRol = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const rol = await Roles.findOne({ where: { id, status: 1 } });
      if (!rol) {
        res.status(404).json({ message: `No existe un rol con el ID ${id}` });
        return;
      }
  
      res.status(200).json({ rol: rol.getDataValue("rol") });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Habla con el administrador",
      });
      return;
    }
  };

  export const getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await Roles.findAll({ where: { status: 1 } });
  
      res.json({
        msg: "Lista de roles obtenida correctamente",
        roles,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la lista de roles" });
      return;
    }
  };