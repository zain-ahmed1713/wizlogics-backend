import asyncHandler from "../../utils/asyncHandler.js";
import { Flashcard } from "../../models/flashcard.model.js"
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";

const updateFlashcard = asyncHandler(async (req, res) => {
    try {
        const { question, answer } = await req.body;
        const { id } = req.params;

        if (!question && !answer) {
            throw new APIError("error", 400, "Question and answer are required");
        }

        const flashcard = await Flashcard.findByIdAndUpdate(id, { question, answer }, { new: true });

        return res.status(201).json(new APIResponse("success", 201, flashcard, "Flashcard updated successfully"));
    } catch (error) {
        console.log("Cannot update flashcard at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot update flashcard at the moment");
    }

})

export { updateFlashcard }