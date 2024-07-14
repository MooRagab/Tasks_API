import { Router } from "express";
import {
  confirmEmail,
  signIn,
  signUp,
} from "../controllers/registration.controller.js";
import { validation } from "../middlewares/valdiation.js";
import * as validator from "../middlewares/valdiation.js";

const router = Router();

router.post("/signup", validation(validator.signUp), signUp); // sign up
router.get("/confirmemail/:token", confirmEmail); // confirm email
router.post("/signin", signIn); // sign in

export default router;
