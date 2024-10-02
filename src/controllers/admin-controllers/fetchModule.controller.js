import { Module } from "../../models/module.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchModule = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const findModule = await Module.findById(id);

    if (!findModule) {
        throw new APIError("error", 404, "Module not found");
    }

    return res.status(200).json(new APIResponse("success", 200, findModule, "Module fetched successfully"))
})

export { fetchModule }