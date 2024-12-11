import { Post } from "../../models/post.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate("userID");

    return res.status(200).json(new APIResponse("success", 200, posts, "Post fetched successfully"));
})

export { fetchPosts }