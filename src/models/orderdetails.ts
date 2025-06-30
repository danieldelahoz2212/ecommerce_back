import { DataTypes } from "sequelize";
import db from "../db/connection";
import Order from "./orders";
import Products from "./products";

const orderDetails = db.define(
  "orderdetails",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
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

orderDetails.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(orderDetails, { foreignKey: 'orderId' });
orderDetails.belongsTo(Products, { foreignKey: 'productId' });
Products.hasMany(orderDetails, { foreignKey: 'productId' });

export default orderDetails;