import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/db.connect.js";
import modelOptions from "./model.options.js";

const userModel = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE, // Sử dụng kiểu DATE
      allowNull: false,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    ...modelOptions, // Kế thừa từ modelOptions
    tableName: "Users", // Tên bảng trong SQL Server
    timestamps: true, // Đảm bảo `createdAt` và `updatedAt` hoạt động
  }
);

export default userModel;
