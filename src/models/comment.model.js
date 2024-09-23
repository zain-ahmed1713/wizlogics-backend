import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postsID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Post
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);