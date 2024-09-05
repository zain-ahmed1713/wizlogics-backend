import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    courseID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Course
    },
    moduleID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: Module
    },
    title: {
        type: String,
        required: true
    }
})

export const Deck = mongoose.model("Deck", deckSchema);