import { FlashcardAttempt } from "../../models/flashcardAttempt.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const showattemptedFlashcards = asyncHandler(async (req, res) => {
    const { userID } = req.params;

    if (!userID) {
        throw new APIError("error", 400, "User ID is required");
    }

    const flashcards = await FlashcardAttempt.find({ userID }).populate("flashcardID");

    if (flashcards.length <= 0) {
        throw new APIError("error", 404, "No attempted flashcards found");
    }

    return res.status(200).json(new APIResponse("success", 200, flashcards, "Attempted flashcards fetched successfully"));
})

export { showattemptedFlashcards }