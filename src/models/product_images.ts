import { DataTypes } from "sequelize";
import db from "../db/connection";
import Products from "./products";

const ProductImages = db.define(
  "product_images",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    img: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
      comment: "Imagen del producto en base64 o URL",
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Orden para el carrusel",
    },
  },
  {
    timestamps: true,
    tableName: "product_images",
  }
);

ProductImages.belongsTo(Products, { foreignKey: "product_id" });
Products.hasMany(ProductImages, { foreignKey: "product_id" });

export default ProductImages;
