import { Course } from "../../models/course.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = await req.body;

    if (!name && !description) {
        throw new APIError("error", 400, "No field to update");
    }

    const findCourse = await Course.findById(id);

    if (!findCourse) {
        throw new APIError("error", 404, "Course not found");
    }

    if (name) {
        findCourse.name = name;
    }
    if (description) {
        findCourse.description = description;
    }

    const updatedCourse = await findCourse.save();

    return res.status(201).json(new APIResponse("success", 200, updatedCourse, "Course updated successfully"));
})

export { updateCourse }