import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String
    },
}, { timestamps: true })

export const Course = mongoose.model("Course", courseSchema)