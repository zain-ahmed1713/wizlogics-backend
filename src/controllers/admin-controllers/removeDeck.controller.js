import { Deck } from "../../models/deck.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const removeDeck = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const deck = await Deck.findById(id);

        if (!deck) {
            throw new APIError("error", 404, "Deck not found");
        }

        await Deck.findByIdAndDelete(id);

        return res.status(200).json(new APIResponse("success", 200, [], "Deck deleted successfully"));
    } catch (error) {
        console.log("Cannot delete deck at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot delete deck at the moment")
    }
})

export { removeDeck }