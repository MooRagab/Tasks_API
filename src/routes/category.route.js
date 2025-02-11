import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.js";
import { validation } from "../middlewares/valdiation.js";
import * as validator from "../middlewares/valdiation.js";

const router = Router();

router.use(auth());

router.get("/", getAllCategories); // get all categories

router.post("/create",validation(validator.createCategory) ,createCategory); // create category

router.put("/update/:categoryId", updateCategory); // update category

router.delete("/delete/:categoryId", deleteCategory); // delete category

export default router;
