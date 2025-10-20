import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import "dotenv/config";
import sequelize from "./src/models/index.js";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 8080;

const server = http.createServer(app);

// Kết nối với database và khởi chạy server
sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connection established successfully.");
    // return sequelize.sync({ force: true, alter: true });
    return await sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log("Database synchronized!");
    server.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  })
  .catch((error) => console.error("Error connecting to the database:", error));
