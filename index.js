import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/DB/connection.js";
import authRouter from "./src/routes/registration.router.js";
import categoryRouter from "./src/routes/category.route.js";
import { globalErrorHandler } from "./src/services/errorHandling.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
app.use(express.json());

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/category`, categoryRouter);

app.use("*", (req, res, next) => {
  res.status(404).json("404 Error Page Not Found");
});
app.use(globalErrorHandler);

connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
