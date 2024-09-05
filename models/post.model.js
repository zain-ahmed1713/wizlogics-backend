import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    content: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema)