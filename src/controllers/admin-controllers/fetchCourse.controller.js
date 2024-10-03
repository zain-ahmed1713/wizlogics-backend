import asyncHandler from "../../utils/asyncHandler.js";
import { Course } from "../../models/course.model.js"
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";

const fetchCourse = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            throw new APIError("error", 404, "Course not found");
        }

        return res.status(200).json(new APIResponse("success", 200, course, "Course fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch course at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch course at the moment")
    }
})

export { fetchCourse }