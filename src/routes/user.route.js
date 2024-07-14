import { Router } from "express";

import { auth } from "../middlewares/auth.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/userserprofile", auth(), getUserProfile); // get user profile
export default router;
