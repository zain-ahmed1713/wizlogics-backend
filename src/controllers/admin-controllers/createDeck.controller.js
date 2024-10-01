import { Deck } from "../../models/deck.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const createDeck = asyncHandler(async (req, res) => {
    try {
        const { title, courseID, moduleID } = await req.body;

        if (!title) {
            throw new APIError("error", 400, "Title is required");
        }

        const deck = await Deck.create({ title, courseID, moduleID });
        const createdDeck = await deck.save();

        return res.status(201).json(new APIResponse("success", 201, createdDeck, "Deck created successfully"));
    } catch (error) {
        console.log("Cannot create deck at the moment. Error:", error);
        throw new APIError("error", 500, "Cannot create deck at the moment")
    }
})

export { createDeck }