import { User } from "../../models/user.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find().select("-bio -password -OTP -otpExpiry -isVerified -refreshToken");

        return res.status(200).json(new APIResponse("success", 200, users, "Users fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch users at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch users at the moment")
    }
});

export { fetchAllUsers }