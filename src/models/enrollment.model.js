import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    status: {
        type: String
    },
    dateEnrolled: {
        type: Date
    },
    completionDate: {
        type: Date
    }
})

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);