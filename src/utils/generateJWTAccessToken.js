import jwt from "jsonwebtoken"

const generateJWTAccessToken = (userID) => {
    return jwt.sign(
        {
            _id: userID
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACEESS_TOKEN_EXPIRY
        }
    )
}

export { generateJWTAccessToken }