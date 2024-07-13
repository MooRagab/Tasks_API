import { taskModel } from "../DB/models/Task.model.js";
import { asyncHandler } from "../services/errorHandling.js";

export const addTextTask = asyncHandler(async (req, res, next) => {
  const { title, description, shared, deadline, status, categoryId } = req.body;

  const task = new taskModel({
    type: "text",
    title,
    description,
    shared,
    user: req.user._id,
    deadline,
    status,
    category: categoryId,
  });
  await task.save();
  task
    ? res.status(201).json({ message: "Done", task })
    : next(new Error("Fail To Create New Task"), { cause: 400 });
});

export const addListTask = asyncHandler(async (req, res, next) => {
  const { title, description, shared, deadline, status, categoryId, items } =
    req.body;

  const task = new taskModel({
    type: "list",
    title,
    description,
    shared,
    user: req.user._id,
    deadline,
    status,
    category: categoryId,
    items,
  });
  await task.save();
  task
    ? res.status(201).json({ message: "Done", task })
    : next(new Error("Fail To Create New Task"), { cause: 400 });
});
