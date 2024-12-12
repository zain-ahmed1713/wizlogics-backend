import { Like } from "../../models/like.model.js";
import { Post } from "../../models/post.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const likePost = asyncHandler(async (req, res) => {
    const { postsID, userID } = await req.body;

    const existingLike = await Like.findOne({ postsID, userID });
    if (existingLike) {
        await Like.deleteOne({ postsID, userID });
        await Post.findByIdAndUpdate(postsID, { $inc: { likesCount: -1 } });

        return res.status(200).json(new APIResponse("success", 200, [], "Post unliked successfully"));
    }

    const like = new Like({ postsID, userID });
    await like.save();

    await Post.findByIdAndUpdate(postsID, { $inc: { likesCount: 1 } });

    return res.status(201).json(new APIResponse("success", 201, [], "Post liked successfully"));
})

export { likePost }