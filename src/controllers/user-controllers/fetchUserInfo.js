import { User } from "../../models/user.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchUserInfo = asyncHandler(async (req, res) => {
    try {
        const username = await req.params?.username;

        if (!username) {
            throw new APIError("error", 400, "Username parameter is required");
        }

        const user = await User.findOne({ username }).select("-email -password -role -OTP -otpExpiry -isVerified -refreshToken");

        if (!user) {
            throw new APIError("error", 404, "User doesn't exist");
        }

        return res.status(200).json(new APIResponse("success", 200, user, "User profile sent"))
    } catch (error) {
        console.log("Error while fetching user info. Error:", error)
        throw new APIError("error", 500, "Can't fetch user info at the moment")
    }
})

export { fetchUserInfo }