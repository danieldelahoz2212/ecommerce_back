import { DataTypes } from "sequelize";
import db from "../db/connection";

const Roles = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    rol:{
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

export default Roles;