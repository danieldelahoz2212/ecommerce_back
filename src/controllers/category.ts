import { Request, Response } from "express";
import Category from "../models/category";

export const getCategorys = async (req: Request, res: Response) => {
  try {
    const categorys = await Category.findAll();
    res.status(200).json({
      msg: "Lista de categorias obtenida correctament",
      categorys,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener la lista de categorias",
    });
  }
};
