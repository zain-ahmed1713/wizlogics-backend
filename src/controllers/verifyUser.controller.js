import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js"

const verifyUser = asyncHandler(async (req, res) => {
    const { username, OTP } = await req.body;

    const user = await User.findOne({ username });

    if (!user) {
        throw new APIError("error", 404, "User does not exist")
    }

    if (user.isVerified) {
        throw new APIError("error", 409, "User already verified")
    }

    if (new Date(user.otpExpiry) > new Date()) {
        if (user.OTP === OTP) {
            await User.findByIdAndUpdate(user._id, { isVerified: true });
            return res.status(201).json(
                new APIResponse("success", 200, [], "User verified")
            )
        }

        throw new APIError("error", 400, "Invalid OTP")
    }

    throw new APIError("error", 400, "Confirmation time exceeded. Please generate a new code")

})

export { verifyUser }