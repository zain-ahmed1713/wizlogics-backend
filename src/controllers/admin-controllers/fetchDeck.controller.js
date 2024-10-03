import { Deck } from "../../models/deck.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const fetchDeck = asyncHandler(async (req, res) => {
    try {
        const { id } = await req.params;

        const deck = await Deck.findById(id);

        if (!deck) {
            throw new APIError("error", 404, "Deck not found");
        }

        return res.status(201).json(new APIResponse("success", 201, deck, "Deck fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch deck at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch deck at the moment")
    }
})

export { fetchDeck }