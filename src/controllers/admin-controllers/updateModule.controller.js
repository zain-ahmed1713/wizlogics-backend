import { Module } from "../../models/module.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const updateModule = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, order } = await req.body;

    if (!title && !content && !order) {
        throw new APIError("error", 400, "No field to update");
    }

    const findModule = await Module.findById(id);

    if (!findModule) {
        throw new APIError("error", 404, "Module not found");
    }

    if (title) {
        findModule.title = title;
    }
    if (content) {
        findModule.content = content;
    }
    if (order) {
        findModule.order = order;
    }

    const updatedModule = await findModule.save();

    return res.status(201).json(new APIResponse("success", 200, updatedModule, "Module updated successfully"));
})

export { updateModule }