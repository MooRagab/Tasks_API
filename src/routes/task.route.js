import { Router } from "express";
import {
  addListTask,
  addTextTask,
  toggleTaskSharing,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/addtext", auth(), addTextTask);
router.post("/addlist", auth(), addListTask);
router.delete("/delete/:taskId", auth(), deleteTask);
router.put("/update/:taskId", auth(), updateTask);
router.patch("/toggleTaskSharing/:taskId", auth(), toggleTaskSharing);

export default router;
