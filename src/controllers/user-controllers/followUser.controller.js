import { Follower } from "../../models/follower.model.js";
import { User } from "../../models/user.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const followUser = asyncHandler(async (req, res) => {
    const { userID, followedUserID } = await req.body;

    if ([followedUserID, userID].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    if (userID === followedUserID) {
        throw new APIError("error", 400, "You cannot follow yourself");
    }

    const alreadyFollowed = await Follower.find({ userID, followedUserID })

    if (alreadyFollowed.length > 0) {
        throw new APIError("Error", 400, "User has been already followed");
    }

    await Follower.create({
        userID,
        followedUserID
    })

    await User.findByIdAndUpdate(
        followedUserID,
        { $inc: { followersCount: 1 } },
    )

    await User.findByIdAndUpdate(
        userID,
        { $inc: { followingCount: 1 } },
    )

    return res.status(201).json(new APIResponse("success", 201, [], "User followed successfully"));
})

export { followUser }