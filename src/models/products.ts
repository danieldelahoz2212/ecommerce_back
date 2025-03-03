import { DataTypes } from "sequelize";
import db from "../db/connection";

const Products = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
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

export default Products;
