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

router.get("/", getAllCategories); // get all categories

router.post("/create", createCategory); // create category

router.put("/update/:categoryId", updateCategory); // update category

router.delete("/delete/:categoryId", deleteCategory); // delete category

export default router;
