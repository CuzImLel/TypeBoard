import http from "http";
import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT: number = 8080;
import router from "./router";

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use(compression());
app.use("/", router());

const server = http.createServer(app);
server.listen(PORT, (): void => console.log(`Server is ready on Port ${PORT}`));

const MONGO_URL: string | undefined = process.env.DB;

mongoose.Promise = Promise;

if (MONGO_URL)
  mongoose
    .connect(MONGO_URL)
    .then(() =>
      console.log("[TYPE-BOARD-BACKEND] => Successfully connected to MongoDB!")
    );

mongoose.connection.on("error", (error: Error) => console.log(error));
app.use("/", router());

app.use("/", router());
