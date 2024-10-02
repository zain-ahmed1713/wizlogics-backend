import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const authStatus = asyncHandler(async (req, res) => {
    res.json(new APIResponse("success", 200, req.user, "User authenticated successfully"))
})

export { authStatus }