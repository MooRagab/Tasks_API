import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth());

router.post("/create", createCategory);
router.get("/", getAllCategories);
router.put("/update/:categoryId", updateCategory);
router.delete("/delete/categoryId", deleteCategory);

export default router;
