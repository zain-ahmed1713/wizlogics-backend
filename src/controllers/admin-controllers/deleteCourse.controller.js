import { Course } from "../../models/course.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const findCourse = await Course.findById(id);

    if (!findCourse) {
        throw new APIError("error", 404, "Course not found");
    }

    await Course.findByIdAndDelete(id);

    return res.status(200).json(new APIResponse("success", 200, [], "Course deleted successfully"))
})

export { deleteCourse }