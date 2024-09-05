import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postsID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Post
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    },
}, { timestamps: true })

export const Like = mongoose.model("Like", likeSchema);