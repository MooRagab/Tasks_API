import { Router } from "express";
import { confirmEmail, signUp } from "../controllers/auth.controller.js";
const router = Router();

//SignUp & Confirm E-mail
router.post("/signup", signUp);
router.get("/confirmemail/:token", confirmEmail);

export default router;
