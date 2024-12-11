import { Like } from "../../models/like.model.js";
import { Post } from "../../models/post.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const unLikePost = asyncHandler(async (req, res) => {
    const { postsID, userID } = req.body;

    await Like.deleteOne({ postsID, userID });

    await Post.findByIdAndUpdate(postsID, { $inc: { likesCount: -1 } });

    return res.status(200).json(new APIResponse("success", 201, [], "Post unliked successfully"));
})

export { unLikePost }