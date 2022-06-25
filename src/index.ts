import express, { Express, Request, Response } from "express";
import "dotenv/config";
import connectDB from "./config/database";
import errorHandler from "./utils/errorHandler";
import { PORT } from "./config/constant";
import logger from "./config/logger";
import { urlRoutes, redirectRoutes } from "./routes";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting CORS headers and accepted HTTP Methods, Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/url", urlRoutes);
app.use("/redirect", redirectRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  connectDB();
});
