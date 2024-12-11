import { Post } from "../../models/post.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
    const { postContent, userID } = await req.body;

    if ([postContent, userID].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const newPost = await Post.create({ userID, content: postContent });

    return res.status(201).json(new APIResponse("success", 200, newPost, "Post created successfully"));
})

export { createPost }