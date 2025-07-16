import { Request, Response } from "express";
import ProductImages from "../models/product_images";

export const getProductImages = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const getProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const images = await ProductImages.findAll({where: { product_id: id }});
    if (!images) {
      res.status(404).json({ msg: "Imagen no encontrada" });
      return;
    }
    res.status(200).json({ msg: "Imagenes del producto obtenidas", images });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener la imagen" });
  }
};

export const addProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    let { img, position, images } = req.body;
    if (Array.isArray(images)) {
      const results = [];
      for (const [i, item] of images.entries()) {
        let { img: imgItem, position: posItem } = item;
        if (!imgItem || typeof imgItem !== "string") {
          results.push({ index: i, error: "El campo 'img' es obligatorio" });
          continue;
        }
        imgItem = imgItem.trim();
        if (!/^data:image\/(png|jpeg|jpg);base64,/.test(imgItem)) {
          results.push({ index: i, error: "La imagen debe estar en formato base64 válido (data:image/png;base64,...)" });
          continue;
        }
        if (!posItem) posItem = 1;
        try {
          const image = await ProductImages.create({
            product_id: productId,
            img: imgItem,
            position: posItem,
          });
          results.push({ index: i, image });
        } catch (err) {
          results.push({ index: i, error: "Error al guardar en base de datos" });
        }
      }
      res.status(201).json({ msg: "Resultado de carga de imágenes", results });
      return;
    }
    console.log("[addProductImage] img recibido:", img);
    if (!img) {
      res.status(400).json({ msg: "El campo 'img' es obligatorio" });
      return;
    }
    img = img.trim();
    if (!/^data:image\/(png|jpeg|jpg);base64,/.test(img)) {
      res.status(400).json({ msg: "La imagen debe estar en formato base64 válido (data:image/png;base64,...)" });
      return;
    }
    if (!position) position = 1;
    const image = await ProductImages.create({
      product_id: productId,
      img,
      position,
    });
    res.status(201).json({ msg: "Imagen agregada", image });
  } catch (error) {
    console.error("[addProductImage] Error:", error);
    res.status(500).json({ msg: "Error al agregar imagen" });
  }
};

export const updateProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    let { img, position } = req.body;
    const image = await ProductImages.findByPk(id);
    if (!image) {
      res.status(404).json({ msg: "Imagen no encontrada" });
      return;
    }
    const updateData: any = {};
    if (typeof img === "string" && img.trim() !== "") {
      img = img.trim();
      if (!/^data:image\/(png|jpeg|jpg);base64,/.test(img)) {
        res
          .status(400)
          .json({
            msg: "La imagen debe estar en formato base64 válido (data:image/png;base64,...)",
          });
        return;
      }
      updateData.img = img;
    }
    if (position !== undefined) updateData.position = position;
    await image.update(updateData);
    res.status(200).json({ msg: "Imagen actualizada", image });
  } catch (error) {
    console.error("[updateProductImage] Error:", error);
    res.status(500).json({ msg: "Error al actualizar imagen" });
  }
};

export const deleteProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
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
