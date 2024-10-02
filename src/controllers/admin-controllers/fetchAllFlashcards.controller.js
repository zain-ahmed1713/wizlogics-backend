import asyncHandler from "../../utils/asyncHandler.js";
import { Flashcard } from "../../models/flashcard.model.js"
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";

const fetchAllFlashcards = asyncHandler(async (req, res) => {
    try {
        const flashcards = await Flashcard.find();

        return res.status(200).json(new APIResponse("success", 200, flashcards, "Flashcards fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch flashcards at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch flashcards at the moment")
    }
})

export { fetchAllFlashcards }