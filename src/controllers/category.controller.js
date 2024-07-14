import { categoryModel } from "../DB/models/Category.model.js";
import { asyncHandler } from "../services/errorHandling.js";
import { paginate } from "../services/pagination.js";

//Create Category

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const category = new categoryModel({
    name,
    description,
    user: req.user._id,
  });
  await category.save();
  category
    ? res.status(201).json({ message: "Done", category })
    : next(new Error("Fail To Create New Category"), { cause: 400 });
});

//Get all User Categories with Paginate

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const { page, size } = req.query;
  const { skip, limit } = paginate(page, size);
  const category = await categoryModel
    .find({
      user: req.user._id,
    })
    .populate([{ path: "user", select: "userName" }])
    .limit(limit)
    .skip(skip);
  res.status(200).json({ message: "This Is All Categories", category });
});

//Update User Categories

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  const category = await categoryModel.findOneAndUpdate(
    { _id: categoryId, user: req.user._id },
    { name, description }
  );
  if (!category) {
    next(new Error("Category Not Found"), { cause: 404 });
  } else {
    res.status(200).json({ message: "Updated Successfully" });
  }
});

//Delete User Categories

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await categoryModel.findOneAndDelete({
    _id: categoryId,
    user: req.user._id,
  });
  if (!category) {
    next(new Error("Category Not Found"), { cause: 404 });
  } else {
    res.status(200).json({ message: "Deleted Successfully" });
  }
});



//Support CRUD actions for all categories
