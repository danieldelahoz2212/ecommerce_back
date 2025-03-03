import { DataTypes } from "sequelize";
import db from "../db/connection";

const Order = db.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPirce: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymont: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Order;
