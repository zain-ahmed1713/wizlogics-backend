import { User } from "../../models/user.model.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { generateJWTAccessToken } from "../../utils/generateJWTAccessToken.js";
import { generateJWTRefreshToken } from "../../utils/generateJWTRefreshToken.js";
import { APIResponse } from "../../utils/APIResponse.js";

const generateJWTTokens = async (userID) => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            throw APIError("error", 404, "User doesn't exist")
        }

        const jwtAccessToken = generateJWTAccessToken(userID);
        const jwtRefreshToken = generateJWTRefreshToken(userID);

        user.refreshToken = jwtRefreshToken;
        await user.save({ validateBeforeSave: false })

        return { jwtAccessToken, jwtRefreshToken };

    } catch (error) {
        throw new APIError("error", 500, "Cannot generate JWT Tokens at the moment")
    }
}

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = await req.body;

        if (!username || !password) {
            throw new APIError("error", 400, "Both email and password are required");
        }

        const userExists = await User.findOne({ username }).select("-OTP -otpExpiry -isVerified -refreshToken");

        if (!userExists) {
            throw new APIError("error", 404, "User doesn't exist");
        }

        const comparePassword = await bcrypt.compare(password, userExists.password);

        if (!comparePassword) {
            throw new APIError("error", 400, "Invalid credentials");
        }

        const { jwtAccessToken, jwtRefreshToken } = await generateJWTTokens(userExists._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("accessToken", jwtAccessToken, cookieOptions).cookie("refreshToken", jwtRefreshToken, cookieOptions).json(new APIResponse("success", 200, { user: userExists }, "User logged in successfully"))
    } catch (error) {
        console.log(error)
        throw new APIError("error", 500, "Cannot login at the moment")
    }

})

export { loginUser }