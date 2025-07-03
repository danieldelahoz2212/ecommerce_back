import { Request, Response } from "express";
import Category from "../models/category";

export const getCategorys = async (req: Request, res: Response): Promise<void> => {
  try {
    const categorys = await Category.findAll();
    res.status(200).json({
      msg: "Lista de categorias obtenida correctamente",
      categorys,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de categorias",
    });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ msg: "El nombre de la categoría es obligatorio" });
      return;
    }
    const exist = await Category.findOne({ where: { name } });
    if (exist) {
      res.status(400).json({ msg: "La categoría ya existe" });
      return;
    }
    const category = await Category.create({ name });
    res.status(201).json({ msg: "Categoría creada correctamente", category });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la categoría" });
  }
};
