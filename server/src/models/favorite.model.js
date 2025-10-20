import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/db.connect.js";
import modelOptions from "./model.options.js";

const favoriteModel = sequelize.define(
  "Favorite",
  {
    favoriteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
    },
    content: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    mediaType: {
      // type: DataTypes.ENUM("tv", "movie"),
      // allowNull: false,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["tv", "movie"]], // Xác thực giá trị hợp lệ
      },
    },
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mediaTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaPoster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mediaRate: {
      type: DataTypes.INTEGER,
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
    ...modelOptions,
    tableName: "Favorites", // Tên bảng trong SQL Server
    timestamps: true, // Đảm bảo `createdAt` và `updatedAt` hoạt động
  }
);

export default favoriteModel;
