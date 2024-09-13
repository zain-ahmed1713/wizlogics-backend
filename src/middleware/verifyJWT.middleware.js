import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new APIError("error", 401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new APIError("error", 401, "Invalid access token")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new APIError("error", 401, error?.message || "Invalid access token");
    }

})

export { verifyJWT }