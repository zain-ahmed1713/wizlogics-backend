import asyncHandler from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js"
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";

const signupUser = asyncHandler(async (req, res) => {
    const { name, email, username, password } = await req.body;

    if ([name, email, username, password].some(field => !field)) {
        throw new APIError("error", 400, "All fields are required");
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
        throw new APIError("error", 409, "Email already exists");
    }

    if (existingUsername) {
        throw new APIError("error", 409, "Username already exists");
    }

    if (password.length < 8) {
        throw new APIError("error", 400, "Password must be of minimum 8 characters");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const OTP = Math.floor(
        Math.random() * 10000 + 1000
    );

    const expiryDate = new Date();
    const otpExpiry = expiryDate.setHours(
        expiryDate.getHours() + 1
    );

    const user = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        OTP,
        otpExpiry,
    })

    const createdUser = await User.findById(user._id).select("-password -OTP -otpExpiry");

    if (!createdUser) {
        throw new APIError("error", 500, "Can't register user at this moment. Please try again later.")
    }

    await sendEmail(email, "Verify your Email", `<div>
      <div>
        <h3>Your Verification Code:</h3>
        <p style={{ textAlign: "center" }}>${verificationCode}</p>
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

    return res.status(201).json(
        new APIResponse("success", 200, createdUser, "User registered successfully")
    )
})

export { signupUser }