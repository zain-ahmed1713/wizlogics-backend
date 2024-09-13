import { Router } from "express";
import { signupUser } from "../controllers/user-controllers/signup.controller.js";
import { verifyUser } from "../controllers/user-controllers/verifyUser.controller.js";
import { regenerateOTP } from "../controllers/user-controllers/regenerateOTP.controller.js";
import { loginUser } from "../controllers/user-controllers/login.controller.js";
import { logoutUser } from "../controllers/user-controllers/logout.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const router = Router();

router.route("/register").post(signupUser)
router.route("/verify").post(verifyUser)
router.route("/regenerate-otp").post(regenerateOTP)
router.route("/auth/login").post(loginUser)
router.route("/auth/logout").post(verifyJWT, logoutUser)

export default router;