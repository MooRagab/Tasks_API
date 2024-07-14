import { taskModel } from "../DB/models/Task.model.js";
import { userModel } from "../DB/models/User.model.js";
import { asyncHandler } from "../services/errorHandling.js";

//Get User By ID
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById({ _id: req.user._id });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }
  const tasks = await taskModel.find({ user: req.user._id });

  return res.json({ message: "Done", user, tasks });
});
