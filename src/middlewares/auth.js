import jwt from "jsonwebtoken";
import { asyncHandler } from "../services/errorHandling.js";
import { userModel } from "../DB/models/User.model.js";

export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARERKEY)) {
      next(new Error("In-Valid Bearer Key", { cause: 401 }));
    } else {
      const token = authorization.split(process.env.BEARERKEY)[1];
      const decoded = jwt.verify(token, process.env.SIGNINTOKEN);
      if (!decoded?.id || !decoded?.isLoggedIn) {
        next(new Error("In-Valid Token Payload", { cause: 401 }));
      } else {
        const user = await userModel
          .findById(decoded.id)
          .select("userName email");
        if (!user) {
          next(new Error("Not Register User", { cause: 404 }));
        } else {
          req.user = user;
          return next();
        }
      }
    }
  });
};
