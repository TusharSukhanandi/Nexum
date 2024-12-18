import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d"
    })


       return res.cookie("NexumJwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly : true,
           secure: process.env.NODE_ENV != "development",
        })
}

export default generateTokenAndSetCookie;
