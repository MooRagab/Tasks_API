import { userModel } from "../DB/models/User.model.js";
import { asyncHandler } from "../services/errorHandling.js";

//Get User By ID
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById({ id: req.params.id });
  if (!user) {
    return next(new Error("User not found"), { cause: 404 });
  }
  return res.json({ message: "Done", user });
});
