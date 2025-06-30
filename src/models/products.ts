import { DataTypes } from "sequelize";
import db from "../db/connection";
import Category from "./category";

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
      references: {
        model: 'category',
        key: 'id',
      },
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

Products.belongsTo(Category, { foreignKey: 'category', as: 'categoryRef' });
Category.hasMany(Products, { foreignKey: 'category', as: 'products' });

export default Products;
