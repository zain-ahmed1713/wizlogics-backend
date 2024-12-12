import { User } from "../../models/user.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchLeaderboard = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ points: -1 }).limit(10)

    return res.status(200).json(new APIResponse("success", 200, users, "Leaderboard fetched successfully"));
})

export { fetchLeaderboard }