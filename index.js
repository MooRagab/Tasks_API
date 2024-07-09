import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/DB/connection.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => res.send("Hello World!"));
app.use("*", (req, res, next) => {
  res.status(404).json("404 Error Page Not Found");
});

connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
