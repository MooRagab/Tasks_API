import { categoryModel } from "../DB/models/Category.model.js";
import { taskModel } from "../DB/models/Task.model.js";
import { asyncHandler } from "../services/errorHandling.js";
import { paginate } from "../services/pagination.js";

//Create a new text task

export const addTextTask = asyncHandler(async (req, res, next) => {
  const { title, description, shared, deadline, status, categoryId, priority } =
    req.body;

  const task = new taskModel({
    type: "text",
    title,
    description,
    shared,
    user: req.user._id,
    deadline,
    status,
    category: categoryId,
    priority,
  });
  await task.save();
  task
    ? res.status(201).json({ message: "Done", task })
    : next(new Error("Fail To Create New Task"), { cause: 400 });
});

//Create a new list task

export const addListTask = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    shared,
    deadline,
    status,
    categoryId,
    items,
    priority,
  } = req.body;

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
    priority,
  });
  await task.save();
  task
    ? res.status(201).json({ message: "Done", task })
    : next(new Error("Fail To Create New Task"), { cause: 400 });
});

//Delete Task With ID

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

//Update Task

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

//(Shared Or Not Shared)

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

//Get Shared Tasks viewr or user

export const getSharedTasks = asyncHandler(async (req, res, next) => {
  const { page, size } = req.query;
  const { skip, limit } = paginate(page, size);
  const task = await taskModel
    .find({
      shared: true,
    })
    .populate([
      { path: "category", select: "name" },
      { path: "user", select: "userName" },
    ])
    .limit(limit)
    .skip(skip);
  res.status(200).json({ message: "This Is All Tasks", task });
});

//Filter Tasks By Category

export const filterTasksByCategory = asyncHandler(async (req, res, next) => {
  const { page, size, categoryName } = req.query;
  const { skip, limit } = paginate(page, size);
  const category = await categoryModel.findOne({ name: categoryName });
  if (!category) {
    return next(new Error("Category Not Found"), { cause: 404 });
  }
  const tasks = await taskModel
    .find({ category: category._id })
    .limit(limit)
    .skip(skip);
  if (!tasks.length) {
    return next(new Error("No Tasks Found in this Category"), { cause: 404 });
  }
  res.status(200).json({ message: "Tasks filtered by category", tasks });
});

//filtering by privacy
export const filterTasksByPrivacy = asyncHandler(async (req, res, next) => {
  const { page, size, taskPrivacy } = req.query;
  const { skip, limit } = paginate(page, size);
  const tasks = await taskModel
    .find({ shared: taskPrivacy })
    .limit(limit)
    .skip(skip);
  if (!tasks.length) {
    return next(new Error("No Tasks Found "), { cause: 404 });
  }
  res.status(200).json({ message: "Tasks filtered by Privacy", tasks });
});
