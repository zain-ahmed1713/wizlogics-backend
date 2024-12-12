import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    profilePicture: {
        type: String
    },
    bio: {
        type: String
    },
    points: {
        type: Number
    },
    rank: {
        type: String,
        default: "Amateur"
    },
    followingCount: {
        type: Number,
        default: 0
    },
    followersCount: {
        type: Number,
        default: 0
    },
    OTP: {
        type: Number
    },
    otpExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", userSchema);