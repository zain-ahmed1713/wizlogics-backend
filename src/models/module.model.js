import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Course
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    order: {
        type: Number
    },
}, { timestamps: true })

export const Module = mongoose.model("Module", moduleSchema);