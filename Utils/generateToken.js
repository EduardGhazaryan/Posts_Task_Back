import jwt from "jsonwebtoken"

export const generateAccessToken = (data) => {
    const payload = {
        ...data
    }

    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "1h"
    })

    return access_token


}