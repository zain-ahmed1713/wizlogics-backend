import jwt from "jsonwebtoken"

const generateJWTRefreshToken = (userID) => {
    return jwt.sign(
        {
            _id: userID
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        }
    )
}

export { generateJWTRefreshToken }