import { Router } from "express";
import { signupUser } from "../controllers/signup.controller.js";
import { verifyUser } from "../controllers/verifyUser.controller.js";
import { regenerateOTP } from "../controllers/regenerateOTP.controller.js";

const router = Router();

router.route("/register").post(signupUser)
router.route("/verify").post(verifyUser)
router.route("/regenerate-otp").post(regenerateOTP)

export default router;