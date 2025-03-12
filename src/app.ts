import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "@/middlewares/error.js";
import dotenv from "dotenv";
import { envMode, PORT } from "./config";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import userRouter from "./routes/user.router";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// your routes here
app.use("/api/v1/users", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log("Server is working on Port:" + PORT + " in " + envMode + " Mode.")
);
