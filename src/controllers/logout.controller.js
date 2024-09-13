import { User } from "../models/user.model.js";
import { APIResponse } from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    });

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new APIResponse("success", [], "User logged out successfully"))

})

export { logoutUser }