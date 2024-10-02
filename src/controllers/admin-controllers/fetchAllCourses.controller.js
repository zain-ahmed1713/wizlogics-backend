import { Course } from "../../models/course.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchAllCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).json(new APIResponse("success", 200, courses, "Courses fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch courses at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch courses at the moment")
    }
});

export { fetchAllCourses }