import { Follower } from "../../models/follower.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const checkFollowedStatus = asyncHandler(async (req, res) => {
    const { userID, followedUserID } = await req.body;

    if ([followedUserID, userID].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const alreadyFollowed = await Follower.find({ userID, followedUserID })

    if (alreadyFollowed.length > 0) {
        return res.status(200).json(new APIResponse("success", 200, [], "User already following."));
    }

    return res.status(200).json(new APIResponse("success", 200, [], "User not following"));
})

export { checkFollowedStatus }