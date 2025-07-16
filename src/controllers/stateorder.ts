import { Request, Response } from "express";
import StateOrder from "../models/stateorder";

export const getStateOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stateOrders = await StateOrder.findAll();
    res.status(200).json({
      msg: "Lista de estados de pedidos obtenida correctamente",
      stateOrders,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener la lista de estados de pedidos",
    });
  }
};

export const createStateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, state } = req.body;
    if (!name || !state) {
      res.status(400).json({ msg: "El nombre y el estado son obligatorios" });
      return;
    }
    const exist = await StateOrder.findOne({ where: { name } });
    if (exist) {
      res.status(400).json({ msg: "El estado ya existe" });
      return;
    }
    const stateOrder = await StateOrder.create({ name, state });
    res.status(201).json({ msg: "Estado creado correctamente", stateOrder });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el estado de pedido" });
  }
};