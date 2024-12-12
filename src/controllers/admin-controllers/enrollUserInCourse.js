import { Course } from "../../models/course.model.js";
import { User } from "../../models/user.model.js";
import { Enrollment } from "../../models/enrollment.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const enrollUserInCourse = asyncHandler(async (req, res) => {
    const { userID, courseID } = await req.body;

    if ([userID, courseID].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const findCourse = await Course.findById(courseID);
    const findUser = await User.findById(userID);
    const isUserAlreadyEnrolled = await Enrollment.findOne({ userID, courseID });

    if (!findCourse) {
        throw new APIError("error", 404, "Course does not exist");
    }

    if (!findUser) {
        throw new APIError("error", 404, "User does not exist");
    }

    if (isUserAlreadyEnrolled) {
        throw new APIError("error", 409, "User is already enrolled in the course");
    }

    const enrollment = await Enrollment.create({ userID, courseID, status: "", dateEnrolled: new Date() });

    return res.status(201).json(new APIResponse("success", 200, [], "User enrolled successfully"));
});

export { enrollUserInCourse }