import { Router } from "express";
import {
  addListTask,
  addTextTask,
  toggleTaskSharing,
  deleteTask,
  updateTask,
  getSharedTasks,
} from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/addtext", auth(), addTextTask); // Add text task
router.post("/addlist", auth(), addListTask); // Add a list of tasks
router.delete("/delete/:taskId", auth(), deleteTask); // Delete tasks
router.put("/update/:taskId", auth(), updateTask); // Update task
router.patch("/toggleTaskSharing/:taskId", auth(), toggleTaskSharing); // Toggle task sharing
router.get("/sharedtasks", getSharedTasks); // Show shared tasks

export default router;
