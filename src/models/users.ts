import { DataTypes } from "sequelize";
import db from "../db/connection";
import Roles from "./roles";

const Users = db.define(
  "users",
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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: true,
    },
    img: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      comment: 'Imagen de usuario en base64 o URL',
    },
  }, {
    timestamps: false
  }
);

Users.belongsTo(Roles, { foreignKey: 'rol' });
Roles.hasMany(Users, { foreignKey: 'rol' });

export default Users;
