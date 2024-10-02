import { Course } from "../../models/course.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createCourse = asyncHandler(async (req, res) => {
    const { name, description, createdBy } = await req.body;

    if ([name, description, createdBy].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const existingCourse = await Course.findOne({ name });

    if (existingCourse) {
        throw new APIError("error", 409, "Course already exists");
    }

    const courses = await Course.create({ name, description, createdBy });

    return res.status(201).json(new APIResponse("success", 200, courses, "Courses created successfully"));
});

export { createCourse }