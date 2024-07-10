import { Router } from "express";
import {
  confirmEmail,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";
const router = Router();

//SignUp & Confirm E-mail
router.post("/signup", signUp);
router.get("/confirmemail/:token", confirmEmail);
router.post("/signin", signIn);

export default router;
