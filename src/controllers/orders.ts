import { Request, Response } from "express";
import Order from "../models/orders";
import Users from "../models/users";
import Products from "../models/products";

export const getOrders = async (res: Response) => {
  try {
    const order = await Order.findAll();

    res.json({
      msg: "Lista de pedidos obtenida correctamente",
      order,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener la lista de pedidos",
    });
    return;
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      res.status(404).json({ message: "Pedido no encontrado" });
      return;
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el pedido" });
    return;
  }
};

export const postOrder = async (req: Request, res: Response) => {
  try {
    const { idUser, idProduct, amount, totalPirce, statusOrder, paymont } =
      req.body;
    const existingUser = await Users.findOne({
      where: { id: idUser, status: 1 },
    });

    if (!existingUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const existingProduct = await Products.findOne({
      where: { id: idProduct, status: 1 },
    });

    if (!existingProduct) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    const stockTotal = amount - existingProduct.getDataValue("stock");

    await existingProduct.update({ stock: stockTotal });

    const order = await Order.create({
      idUser,
      idProduct,
      amount,
      totalPirce,
      statusOrder,
      paymont,
    });

    res.status(200).json({
      msg: "Orden creada con correctamente",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};
