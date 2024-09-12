import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

const regenerateOTP = asyncHandler(async (req, res) => {
    const { username } = await req.body;

    const user = await User.findOne({ username });
    const { email } = user;

    const OTP = Math.floor(Math.random() * 10000 + 1000);
    await sendEmail(email, "New OTP Generated", `<div>
        <div>
          <h3>Your New OTP:</h3>
          <p style={{ textAlign: "center" }}>${OTP}</p>
        </div>
        <div>
          <p>If you didn&apos;t request this, please ignore this email.</p>
          <p>
            Best,
            <br />
            Team WizLogics
          </p>
        </div>
      </div>`)

    const expiryDate = new Date();
    const otpExpiry = expiryDate.setHours(expiryDate.getHours() + 1);

    const saveNewCode = await User.findByIdAndUpdate(user._id, { OTP, otpExpiry });

    if (!saveNewCode) {
        throw new APIError("error", 500, "Couldn't generate new OTP. Please try again later")
    }

    return res.status(201).json(
        new APIResponse("success", 200, [], "New OTP has been generated")
    )
})

export { regenerateOTP }