import { categoryModel } from "../DB/models/Category.model.js";
import { asyncHandler } from "../services/errorHandling.js";
import { paginate } from "../services/pagination.js";

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

export const getAllCategories = asyncHandler(async (req, res, next) => {
  // const { page, size } = req.query;
  // const { skip, limit } = paginate(page, size);
  const category = await categoryModel.find({});
  // .limit(limit).skip(skip);
  res.status(200).json({ message: "This Is All Categories", category });
});
