import { Deck } from "../../models/deck.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createDeck = asyncHandler(async (req, res) => {
    try {
        const { title } = await req.body;

        if (!title) {
            throw new APIError("error", 400, "Title is required");
        }

        const existingDeck = await Deck.findOne({ title });

        if (existingDeck) {
            throw new APIError("error", 400, "Deck already exists");
        }

        const deck = await Deck.create({ title });
        const createdDeck = await deck.save();

        return res.status(201).json(new APIResponse("success", 201, createdDeck, "Deck created successfully"));
    } catch (error) {
        console.log("Cannot create deck at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot create deck at the moment")
    }
})

export { createDeck }