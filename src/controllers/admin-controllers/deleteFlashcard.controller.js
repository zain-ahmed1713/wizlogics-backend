import asyncHandler from "../../utils/asyncHandler.js";
import { Flashcard } from "../../models/flashcard.model.js"
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";

const deleteFlashcard = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const flashcard = await Flashcard.findById(id);

        if (!flashcard) {
            throw new APIError("error", 404, "Flashcard not found");
        }

        await Flashcard.findByIdAndDelete(id);

        return res.status(200).json(new APIResponse("success", 200, [], "Flashcard deleted successfully"));
    } catch (error) {
        console.log("Cannot delete flashcard at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot delete flashcard at the moment")
    }
})

export { deleteFlashcard }