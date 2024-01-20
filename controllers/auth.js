import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            country: req.body.country
        })

        await newUser.save()
        res.status(200).json("New User Registered")

    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({
            username: req.body.username,
        })
        if (!user) return next(createError(404, "User Not Found!"))

        const is_password_correct = await bcrypt.compare(req.body.password, user.password)
        if (!is_password_correct) return next(createError(404, "Wrong Password or Username!"))

        const token = jwt.sign({ id: user._id, is_admin: user.isAdmin }, process.env.JWT_SECRET_KEY)
        res.cookie("access_token", token, {
            httpOnly: true
        })
        const { password, is_admin, ...other_details } = user._doc
        res.status(200).json(other_details)

    } catch (e) {
        next(e)
    }
}