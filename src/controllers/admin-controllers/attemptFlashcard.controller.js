import { FlashcardAttempt } from "../../models/flashcardAttempt.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const attemptFlashcard = asyncHandler(async (req, res) => {
    const { flashcardID, userID, status } = req.body;

    if ([flashcardID, userID].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const alreadyAttempted = await FlashcardAttempt.findOne({ flashcardID, userID });

    if (alreadyAttempted) {
        alreadyAttempted.status = status;
        alreadyAttempted.dateAttempted = new Date();
        await alreadyAttempted.save();
    } else {
        await FlashcardAttempt.create({ flashcardID, userID, status, dateAttempted: new Date() });
    }

    const flashcards = await FlashcardAttempt.find({ userID }).populate("flashcardID");

    return res.status(200).json(new APIResponse("success", 200, flashcards, "Flashcard attempted successfully"));
})

export { attemptFlashcard }