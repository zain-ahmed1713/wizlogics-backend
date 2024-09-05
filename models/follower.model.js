import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    }, /* The user who is following someone */
    followedUserID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    } /* The user being followed */
})

export const Follower = mongoose.model("Follower", followerSchema);