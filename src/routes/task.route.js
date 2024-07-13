import { Router } from "express";
import { addTextTask } from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";
const router = Router();

router.post("/addtext", auth(), addTextTask);

export default router;
