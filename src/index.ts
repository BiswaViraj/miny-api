import express, { Express, Request, Response } from "express";
import "dotenv/config";
import connectDB from "./config/database";
import urlRouter from "./routes/url.route";
import errorHandler from "./utils/errorHandler";

const app: Express = express();
const port = process.env.PORT;

const urlRoutes = urlRouter;

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
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  connectDB();
});
