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

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await taskModel.findOneAndDelete({
    _id: taskId,
    user: req.user._id,
  });
  if (!task) {
    next(new Error("Task Not Found"), { cause: 404 });
  } else {
    res.status(200).json({ message: "Deleted Successfully" });
  }
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const { title, description, deadline, status, priority } = req.body;

  const task = await taskModel.findOneAndUpdate(
    { _id: taskId, user: req.user._id },
    { title, description, deadline, status, priority }
  );
  if (!task) {
    next(new Error("Task Not Found"), { cause: 404 });
  } else {
    res.status(200).json({ message: "Updated Successfully" });
  }
});

export const toggleTaskSharing = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  const task = await taskModel.findOne({ _id: taskId, user: req.user._id });

  if (!task) {
    next(new Error("Task Not Found"), { cause: 404 });
  } else {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id: taskId, user: req.user._id },
      { shared: !task.shared },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Updated Successfully", task: updatedTask });
  }
});
