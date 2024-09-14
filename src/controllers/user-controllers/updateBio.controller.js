import asyncHandler from "../../utils/asyncHandler.js"
import { APIError } from "../../utils/APIError.js"
import { User } from "../../models/user.model.js"
import { APIResponse } from "../../utils/APIResponse.js";

const updateBio = asyncHandler(async (req, res) => {
    try {
        const bio = await req.body?.bio;
        const userID = await req.user?._id;

        if (!bio) {
            throw new APIError("error", 400, "Bio is required");
        }

        await User.findByIdAndUpdate(userID, { bio })

        return res.status(200).json(new APIResponse("success", 201, [], "Bio updated successfully"))
    } catch (error) {
        console.log("Cannot update bio at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot update bio at the moment")
    }
})

export { updateBio }