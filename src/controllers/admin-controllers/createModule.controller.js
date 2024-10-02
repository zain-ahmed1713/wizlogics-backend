import { Course } from "../../models/course.model.js";
import { Module } from "../../models/module.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createModule = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, order } = await req.body;

        if ([title, content, order].some(field => !field)) {
            throw new APIError("error", 400, "All fields are required");
        }

        const findCourse = await Course.findById(id);

        if (!findCourse) {
            throw new APIError("error", 404, "Course not found");
        }

        const modules = await Module.create({ courseID: id, title, content, order });

        return res.status(201).json(new APIResponse("success", 200, modules, "Module created successfully"));
    } catch (error) {
        console.log(error)
    }

})

export { createModule }