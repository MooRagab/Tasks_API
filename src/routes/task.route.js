import { Router } from "express";
import {
  addListTask,
  addTextTask,
  toggleTaskSharing,
  deleteTask,
  updateTask,
  getSharedTasks,
  filterTasksByCategory,
  filterTasksByPrivacy,
} from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";
import { validation } from "../middlewares/valdiation.js";
import * as validator from "../middlewares/valdiation.js";

const router = Router();

router.post(
  "/addtext",
  auth(),
  validation(validator.createTextTaskSchema),
  addTextTask
); // Add text task
router.post(
  "/addlist",
  auth(),
  validation(validator.createListTaskSchema),
  addListTask
); // Add a list of tasks
router.delete("/delete/:taskId", auth(), deleteTask); // Delete tasks
router.put("/update/:taskId", auth(), updateTask); // Update task
router.patch("/toggleTaskSharing/:taskId", auth(), toggleTaskSharing); // Toggle task sharing
router.get("/sharedtasks", getSharedTasks); // Show shared tasks
router.get("/tasksbycategory", filterTasksByCategory); //filter tasks by category
router.get("/tasksbyprivacy", filterTasksByPrivacy); //filter tasks by privacy

export default router;
