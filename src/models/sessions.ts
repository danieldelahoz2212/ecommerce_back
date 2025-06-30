import { DataTypes } from "sequelize";
import db from "../db/connection";
import Users from "./users";

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
      references: {
        model: 'users',
        key: 'id',
      },
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

Sessions.belongsTo(Users, { foreignKey: 'idUsers' });
Users.hasMany(Sessions, { foreignKey: 'idUsers' });

export default Sessions;
