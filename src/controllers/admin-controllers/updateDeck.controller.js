import { Deck } from "../../models/deck.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const updateDeck = asyncHandler(async (req, res) => {
    try {
        const { title } = await req.body;
        const { id } = req.params;

        const deck = await Deck.findById(id);

        if (!deck) {
            throw new APIError("error", 404, "Deck not found");
        }

        if (!title) {
            throw new APIError("error", 400, "Title is required");
        }

        const updatedDeck = await Deck.findByIdAndUpdate(id, { title }, { new: true });

        return res.status(201).json(new APIResponse("success", 201, updatedDeck, "Deck updated successfully"));
    } catch (error) {
        console.log("Cannot update deck at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot update deck at the moment")
    }
})

export { updateDeck }