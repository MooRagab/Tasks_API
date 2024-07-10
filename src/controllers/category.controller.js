import { categoryModel } from "../DB/models/Category.model.js";
import { asyncHandler } from "../services/errorHandling.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description, shared, priority } = req.body;

  const category = new categoryModel({
    name,
    description,
    shared,
    priority,
    user: req.user._id,
  });
  await category.save();
  category
    ? res.status(201).json({ message: "Done", category })
    : next(new Error("Fail To Create New Category"), { cause: 400 });
});
