import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: "mssql",
    timezone: "+07:00",
    dialectOptions: {
      encrypt: true,
      trustServerCertificate: true,
    },
    logging: false,
  }
);

export default sequelize;
