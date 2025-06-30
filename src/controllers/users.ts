import { Request, Response } from "express";
import Users from "../models/users";
import { encrypt } from "./auth";

import jwt from "jsonwebtoken";
import Sessions from "../models/sessions";
import { compare } from "bcrypt";
import Roles from "../models/roles";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();

    res.status(200).json({
      msg: "Lista de usuarios obtenida correctamente",
      users,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener la lista de usuarios",
    });
    return;
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (user) {
      res.status(200).json({
        msg: "usuario obtenido correctamente",
        user,
      });
      return;
    } else {
      res.status(404).json({
        msg: `usuario no encontrado ${user}`,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener el usuario",
    });
    return;
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, rol } = req.body;

    const succeedEmail = await Users.findOne({ where: { email } });

    if (succeedEmail) {
      res.status(400).json({
        msg: "Este correo ya está registrado",
        status: false,
      });
      return;
    }

    const pass = await encrypt(password);

    const user = await Users.create({
      name,
      lastName,
      email,
      password: pass,
      rol,
    });

    const token = jwt.sign(
      { id: user.getDataValue("id"), rol: user.getDataValue("rol") },
      process.env.JWT_SECRET as string
    );

    await Sessions.create({ idUsers: user.getDataValue("id"), token: token });

    res.status(200).json({
      msg: "Usuario creado con éxito",
      user: {
        id: user.getDataValue("id"),
        name: user.getDataValue("name"),
        lastName: user.getDataValue("lastName"),
        email: user.getDataValue("email"),
        rol: user.getDataValue("rol"),
      },
      token: token,
      status: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Habla con el administrador",
    });
    return;
  }
};

export const patchRol = async (req: Request, res: Response) => {
  try {
    const { email, rol } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      res
        .status(400)
        .json({ message: "No existe un usuario con el email " + email });
      return;
    }

    const roles = await Roles.findOne({ where: { id: rol } });
    if (!roles) {
      res.status(400).json({ message: "No existe un rol con el id " + rol });
      return;
    }

    await user.update({ rol });

    res.status(200).json({
      msg: "usuario actualizado con éxito",
      user,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Habla con el administrador",
    });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await Users.findByPk(id);

  if (!user) {
    res.status(400).json({ message: `No existe un usuario con el id: ${id}` });
  }

  await user?.update({ status: false });

  res.status(200).json({
    message: "El Usuario fue eliminado con éxito",
    user,
  });
  return;
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, status: 1 } });
  if (!user) {
    res
      .status(400)
      .json({ message: "No existe un usuario con el email " + email });
    return;
  }

  const checkPassword = await compare(password, user.getDataValue("password"));

  const session = await Sessions.findOne({
    where: { idUsers: user.getDataValue("id") },
  });

  if (!session) {
    res.status(402).json({ message: "no se encontro el token" });
    return;
  }

  if (checkPassword) {
    res.status(200).json({
      message: "Usuario logueado con éxito",
      user,
      token: session?.getDataValue("token"),
    });
    return;
  }
};
