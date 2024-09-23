import { Course } from "../../models/course.model.js";
import { Module } from "../../models/module.model.js"
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchAllModules = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const findCourse = await Course.findById(id);

    if (!findCourse) {
        throw new APIError("error", 404, "Course not found");
    }

    const modules = await Module.find({ courseID: id }).sort({ order: 1 });

    if (!modules) {
        throw new APIError("error", 404, "No modules found");
    }

    return res.status(200).json(new APIResponse("success", 200, modules, "Modules fetched successfully"))

})

export { fetchAllModules }