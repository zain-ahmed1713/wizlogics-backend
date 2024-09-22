import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { fetchAllUsers } from "../controllers/admin-controllers/fetchAllUsers.controller.js";
import { fetchAllCourses } from "../controllers/admin-controllers/fetchAllCourses.controller.js";
import { createCourse } from "../controllers/admin-controllers/createCourse.controller.js";
import { updateCourse } from "../controllers/admin-controllers/updateCourse.controller.js";
import { deleteCourse } from "../controllers/admin-controllers/deleteCourse.controller.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, fetchAllUsers)
router.route("/get-all-courses").get(verifyJWT, fetchAllCourses)
router.route("/add-course").post(verifyJWT, createCourse)
router.route("/update-course/:id").patch(verifyJWT, updateCourse)
router.route("/delete-course/:id").delete(verifyJWT, deleteCourse)

export default router;