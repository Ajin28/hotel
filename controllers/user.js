import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUser)
    } catch (e) {
        next(e)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (e) {
        // res.status(500).json(e)
        next(e)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const allUser = await User.find()
        res.status(200).json(allUser)
    } catch (e) {
        next(e)
    }
}


