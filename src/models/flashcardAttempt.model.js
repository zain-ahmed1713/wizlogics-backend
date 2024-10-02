import mongoose from "mongoose";

const flashcardAttemptSchema = new mongoose.Schema({
    flashcardID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Flashcard"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: Boolean
    },
    dateAttempted: {
        type: Date
    }
})

export const FlashcardAttempt = mongoose.model("FlashcardAttempt", flashcardAttemptSchema);