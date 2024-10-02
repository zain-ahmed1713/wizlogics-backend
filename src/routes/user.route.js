import { Router } from "express";
import { signupUser } from "../controllers/user-controllers/signup.controller.js";
import { verifyUser } from "../controllers/user-controllers/verifyUser.controller.js";
import { regenerateOTP } from "../controllers/user-controllers/regenerateOTP.controller.js";
import { loginUser } from "../controllers/user-controllers/login.controller.js";
import { logoutUser } from "../controllers/user-controllers/logout.controller.js";
import { fetchUserInfo } from "../controllers/user-controllers/fetchUserInfo.controller.js";
import { uploadProfilePhoto } from "../controllers/user-controllers/uploadProfilePhoto.controller.js";
import { upload } from "../middleware/saveFilesToLocalServer.middleware.js";
import { updateBio } from "../controllers/user-controllers/updateBio.controller.js";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { logoutUser } from "../controllers/logout.controller.js";
import { authStatus } from "../controllers/authStatus.controller.js";

const router = Router();

router.route("/register").post(signupUser)
router.route("/verify").post(verifyUser)
router.route("/regenerate-otp").post(regenerateOTP)
router.route("/auth/login").post(loginUser)
router.route("/auth/status").get(verifyJWT, authStatus)
router.route("/auth/logout").post(verifyJWT, logoutUser)
router.route("/profile/:username").get(fetchUserInfo)
router.route("/profile/upload-photo").patch(verifyJWT, upload.single("profilePicture"), uploadProfilePhoto)
router.route("/profile/update-bio").patch(verifyJWT, updateBio)

export default router;