import customError from "./error.handler.middleware.js"
import { decode_token } from "../utils/jwt.utils.js"
import User from "../models/user.model.js"

export const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            console.log("header of authenticate ", req['headers'])
            
            const cookies = req.cookies || {}
            console.log(cookies)
            
            // ✅ Read token from cookie OR Authorization header
            const token = cookies['access_token'] || 
                          req.headers['authorization']?.split(' ')[1]

            if (!token) {
                throw new customError("Unauthorized . Access denied", 401)
            }

            const decoded_data = decode_token(token)
            console.log("decoded data ", decoded_data)
            
            if (!decoded_data) {
                throw new customError("Unauthorized . Access denied", 401)
            }

            // Check if token has expired
            if (decoded_data.exp * 1000 < Date.now()) {
                res.clearCookie('access_token', {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                throw new customError("session has expired", 401)
            }

            // Check if user exists
            const user = await User.findOne({
                _id: decoded_data._id,
                email: decoded_data.email
            })
            
            if (!user) {
                throw new customError("Unauthorized . Access denied", 401)
            }

            if (roles && Array.isArray(roles) && 
                roles.length > 0 && !roles.includes(user.role)) {
                throw new customError("Forbidden access denied", 403)
            }

            console.log(decoded_data)
            req.user = user
            next()

        } catch (error) {
            next(error)
        }
    }
}