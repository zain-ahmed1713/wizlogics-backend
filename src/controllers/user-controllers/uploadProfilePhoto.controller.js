import { User } from "../../models/user.model.js";
import { APIError } from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadFilesToCloudinary } from "../../utils/uploadFilesToCloudinary.js"

const uploadProfilePhoto = asyncHandler(async (req, res) => {
    try {
        const profilePicture = req.file?.path
        const authenticatedUser = req.user?._id

        if (!profilePicture) {
            throw new APIError("error", 400, "Profile photo is required")
        }

        const uploadProfilePhoto = await uploadFilesToCloudinary(profilePicture)

        await User.findByIdAndUpdate(authenticatedUser, { profilePicture: uploadProfilePhoto.url })

        return res.status(200).json(new APIResponse("success", 201, { url: uploadProfilePhoto.url }, "Profile picture updated successfully"))

    } catch (error) {
        console.log("Error while uploading profile picture. Error:", error);
        throw new APIError("error", 500, "Error while uploading profile picture")
    }

})

export { uploadProfilePhoto }