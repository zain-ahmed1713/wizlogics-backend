import asyncHandler from "../../utils/asyncHandler.js";
import { Deck } from "../../models/deck.model.js"
import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";

const fetchAllDecks = asyncHandler(async (req, res) => {
    try {
        const deck = await Deck.find();

        return res.status(200).json(new APIResponse("success", 200, deck, "Decks fetched successfully"));
    } catch (error) {
        console.log("Cannot fetch decks at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot fetch decks at the moment")
    }
})

export { fetchAllDecks }