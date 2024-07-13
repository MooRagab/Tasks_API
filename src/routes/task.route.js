import { Router } from "express";
import { addListTask, addTextTask } from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";
const router = Router();

router.post("/addtext", auth(), addTextTask);
router.post("/addlist", auth(), addListTask);

export default router;
