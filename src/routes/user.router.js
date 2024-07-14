import { Router } from "express";

import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/getUserProfile/:id", auth);
export default router;
