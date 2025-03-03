import { DataTypes } from "sequelize";
import db from "../db/connection";

const Sessions = db.define(
  "sessions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idUsers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
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

export default Sessions;
