import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";
import { fetchAllUsers } from "../controllers/admin-controllers/fetchAllUsers.controller.js";
import { fetchAllCourses } from "../controllers/admin-controllers/fetchAllCourses.controller.js";
import { createCourse } from "../controllers/admin-controllers/createCourse.controller.js";
import { updateCourse } from "../controllers/admin-controllers/updateCourse.controller.js";
import { deleteCourse } from "../controllers/admin-controllers/deleteCourse.controller.js";
import { fetchAllModules } from "../controllers/admin-controllers/fetchAllModules.controller.js";
import { fetchModule } from "../controllers/admin-controllers/fetchModule.controller.js";
import { createModule } from "../controllers/admin-controllers/createModule.controller.js";
import { updateModule } from "../controllers/admin-controllers/updateModule.controller.js";
import { deleteModule } from "../controllers/admin-controllers/deleteModule.controller.js";

const router = Router();

router.route("/get-all-users").get(verifyJWT, fetchAllUsers)
router.route("/get-all-courses").get(verifyJWT, fetchAllCourses)
router.route("/add-course").post(verifyJWT, createCourse)
router.route("/update-course/:id").patch(verifyJWT, updateCourse)
router.route("/delete-course/:id").delete(verifyJWT, deleteCourse)
router.route("/get-all-modules/:id").get(verifyJWT, fetchAllModules) // :id is courseID
router.route("/get-module/:id").get(verifyJWT, fetchModule) // :id is moduleID
router.route("/add-module/:id").post(verifyJWT, createModule) // :id is courseID
router.route("/update-module/:id").patch(verifyJWT, updateModule) // :id is moduleID
router.route("/delete-module/:id").delete(verifyJWT, deleteModule) // :id is moduleID

export default router;