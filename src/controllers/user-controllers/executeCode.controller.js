import { APIResponse } from "../../utils/APIResponse.js";
import { APIError } from "../../utils/APIError.js";
import asyncHandler from "../../utils/asyncHandler.js";

const executeCode = asyncHandler(async (req, res) => {
    try {
        const { script, language, versionIndex } = req.body;

        // Log incoming request body for debugging
        console.log('Request Body:', { script, language, versionIndex });

        const response = await fetch('https://api.jdoodle.com/v1/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: process.env.JDOODLE_CLIENT_ID,
                clientSecret: process.env.JDOODLE_CLIENT_SECRET,
                script,
                language,
                versionIndex: versionIndex || "0",
                stdin: '' // Ensure this is always a string
            })
        });

        // Log full response for debugging
        const responseBody = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Body:', responseBody);

        if (!response.ok) {
            throw new Error(`JDoodle API request failed: ${responseBody}`);
        }

        const data = JSON.parse(responseBody);

        return res.status(201).json(new APIResponse("success", 200, data, "Code executed successfully."));
    } catch (error) {
        console.error("Execution Error:", error);
        throw new APIError("error", 500, error.message || "Cannot execute code at the moment");
    }
});

export { executeCode };