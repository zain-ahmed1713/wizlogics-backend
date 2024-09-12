import { Router } from "express";
import { signupUser } from "../controllers/signup.controller.js";
import { verifyUser } from "../controllers/verifyUser.controller.js";
import { regenerateOTP } from "../controllers/regenerateOTP.controller.js";
import { loginUser } from "../controllers/login.controller.js";

const router = Router();

router.route("/register").post(signupUser)
router.route("/verify").post(verifyUser)
router.route("/regenerate-otp").post(regenerateOTP)
router.route("/auth/login").post(loginUser)

export default router;