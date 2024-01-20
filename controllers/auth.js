import User from '../models/User.js'
import bcrypt from 'bcryptjs'

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