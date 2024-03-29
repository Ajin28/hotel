import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/User.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(createError(403, "Invalid token"))
        req.user = user
        next()
    })

}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.is_admin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized"))
        }
    })

}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.is_admin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized"))
        }
    })

}