import { DataTypes } from "sequelize";
import db from "../db/connection";

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: true,
    }
}, {
    timestamps: false
  });

  export default Category;