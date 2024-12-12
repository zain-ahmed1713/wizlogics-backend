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
import { authStatus } from "../controllers/user-controllers/authStatus.controller.js";
import { createPost } from "../controllers/user-controllers/createPost.controller.js";
import { fetchPosts } from "../controllers/user-controllers/fetchPosts.controller.js";
import { likePost } from "../controllers/user-controllers/likePost.controller.js";
import { unLikePost } from "../controllers/user-controllers/unlikePost.controller.js";
import { executeCode } from "../controllers/user-controllers/executeCode.controller.js";
import { followUser } from "../controllers/user-controllers/followUser.controller.js";
import { checkFollowedStatus } from "../controllers/user-controllers/checkFollowedStatus.controller.js";
import { unFollowUser } from "../controllers/user-controllers/unFollowUser.controller.js";

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
router.route("/create-post").post(verifyJWT, createPost)
router.route("/fetch-posts").get(verifyJWT, fetchPosts)
router.route("/like-post").post(verifyJWT, likePost)
router.route("/unlike-post").post(verifyJWT, unLikePost)
router.route("/execute").post(verifyJWT, executeCode)
router.route("/follow-user").post(verifyJWT, followUser)
router.route("/followed-status").post(verifyJWT, checkFollowedStatus)
router.route("/unfollow-user").post(verifyJWT, unFollowUser)

export default router;