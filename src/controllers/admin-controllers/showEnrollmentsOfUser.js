import { Enrollment } from "../../models/enrollment.model.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const showEnrollmentsOfUser = asyncHandler(async (req, res) => {
    const { userID } = req.params;

    const findEnrollments = await Enrollment.find({ userID }).populate("courseID", "name");

    if (!findEnrollments) {
        throw new APIError("error", 404, "No enrollments found");
    }

    return res.status(200).json(new APIResponse("success", 200, findEnrollments, "Enrollments fetched successfully"));
})

export { showEnrollmentsOfUser }