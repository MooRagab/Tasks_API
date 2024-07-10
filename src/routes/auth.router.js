import { Router } from "express";
import {
  confirmEmail,
  signIn,
  signUp,
} from "../controllers/registration.controller.js";
const router = Router();

router.post("/signup", signUp);
router.get("/confirmemail/:token", confirmEmail);
router.post("/signin", signIn);

export default router;
