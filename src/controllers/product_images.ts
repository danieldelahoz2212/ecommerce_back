import { Request, Response } from "express";
import ProductImages from "../models/product_images";

export const getProductImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const images = await ProductImages.findAll({
      where: { product_id: productId },
      order: [["position", "ASC"]],
    });
    res.status(200).json({ msg: "Imágenes obtenidas", images });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener imágenes" });
  }
};

export const addProductImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { img, position } = req.body;
    if (!img || !/^data:image\/(png|jpeg|jpg);base64,/.test(img)) {
      res.status(400).json({ msg: "La imagen debe estar en formato base64 válido" });
      return;
    }
    const image = await ProductImages.create({
      product_id: productId,
      img,
      position,
    });
    res.status(201).json({ msg: "Imagen agregada", image });
  } catch (error) {
    res.status(500).json({ msg: "Error al agregar imagen" });
  }
};

export const updateProductImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { img, position } = req.body;
    const image = await ProductImages.findByPk(id);
    if (!image) {
      res.status(404).json({ msg: "Imagen no encontrada" });
      return;
    }
    await image.update({ img, position });
    res.status(200).json({ msg: "Imagen actualizada", image });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar imagen" });
  }
};

export const deleteProductImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await ProductImages.findByPk(id);
    if (!image) {
      res.status(404).json({ msg: "Imagen no encontrada" });
      return;
    }
    await image.destroy();
    res.status(200).json({ msg: "Imagen eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar imagen" });
  }
};
