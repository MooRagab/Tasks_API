import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.use(auth());

router.post("/create", createCategory);
router.get("/", getAllCategories)

export default router;
