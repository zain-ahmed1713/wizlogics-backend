import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    deckID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Deck"
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { timestamps: true })

export const Flashcard = mongoose.model("Flashcard", flashcardSchema)