import { Request, Response } from "express";
import Products from "../models/products";
import Category from "../models/category";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.findAll({ where: { status: 1 } });

    res.status(200).json({
      msg: "Lista de productos obtenida correctamente",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener la lista de productos",
    });
    return;
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).json({
        msg: `produto no encontrado ${id}`,
      });
      return;
    }
    res.status(200).json({
      msg: "producto obtenido correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el producto",
    });
    return;
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const succeedProduct = await Products.findOne({ where: { name } });
    if (succeedProduct) {
      res.status(400).json({ msg: "El producto ya existe" });
      return;
    }

    const Product = await Products.create({
      name,
      description,
      price,
      category,
      stock,
    });
    res.status(200).json({
      msg: "producto creado correctamente",
      Product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Habla con el administrador",
    });
    return;
  }
};

export const patchProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).json({ msg: `producto no encontrado ${id}` });
      return;
    }

    const updatedProduct = await product.update({
      name,
      description,
      price,
      category,
      stock,
    });
    res.status(200).json({ msg: "producto actualizado correctamente", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Habla con el administrador" });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      res.status(404).json({ msg: `producto no encontrado ${id}` });
      return;
    }
    await product.update({ status: false });
    res.status(200).json({
      msg: "producto eliminado correctamente",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Habla con el administrador" });
    return;
  }
};
