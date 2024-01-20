import User from '../models/User.js'

export const register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
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