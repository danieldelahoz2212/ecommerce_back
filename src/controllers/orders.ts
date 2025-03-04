import { Request, Response } from "express";
import Order from "../models/orders";
import Users from "../models/users";
import Products from "../models/products";
import orderDetails from "../models/orderdetails";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      where: { status: 1 },
    });

    res.json({
      msg: "Lista de pedidos obtenida correctamente",
      orders,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener la lista de pedidos" });
    return;
  }
};

export const getOrdersUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({ where: { idUser: id, status: 1 } });
    if (!orders) {
      res.status(404).json({ message: "Pedido no encontrado" });
      return;
    }
    res.status(200).json({
      msg: "Lista de pedidos del usuario obtenida correctamente",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el pedido" });
    return;
  }
};

export const postOrder = async (req: Request, res: Response) => {
  try {
    const { idUser, products, payment } = req.body;

    const existingUser = await Users.findOne({
      where: { id: idUser, status: 1 },
    });
    if (!existingUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (!products || products.length === 0) {
      res.status(400).json({ message: "No hay productos en el pedido" });
      return;
    }

    const productIds = products.map((p: any) => p.id);
    const availableProducts = await Products.findAll({
      where: { id: productIds, status: 1 },
    });

    if (availableProducts.length !== products.length) {
      res.status(404).json({ message: "Uno o más productos no existen" });
      return;
    }

    let totalPrice = 0;
    const updatedStock = [];

    for (const item of products) {
      const product = availableProducts.find(
        (p) => Number(p.getDataValue("id")) === Number(item.id)
      );

      if (!product) continue;

      if (product.getDataValue("stock") < item.amount) {
        res.status(400).json({
          message: `Stock insuficiente para el producto ID ${item.idProduct}`,
        });
        return;
      }

      totalPrice += product.getDataValue("price") * item.amount;
      updatedStock.push({
        id: product.getDataValue("id"),
        newStock: product.getDataValue("stock") - item.amount,
      });
    }
    const order = await Order.create({
      idUser,
      totalPrice,
      payment,
      statusOrder: 1,
    });

    const orderDetailsData = products.map((item: any) => ({
      orderId: order.getDataValue("id"),
      productId: item.id,
      amount: item.amount,
      price: item.price,
    }));

    await orderDetails.bulkCreate(orderDetailsData);

    await Promise.all(
      updatedStock.map(({ id, newStock }) =>
        Products.update({ stock: newStock }, { where: { id } })
      )
    );

    res.status(200).json({
      msg: "Orden creada correctamente",
      order,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el pedido" });
  }
};
