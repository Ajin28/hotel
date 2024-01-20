import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (e) {
        next(e)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (e) {
        next(e)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteHotel)
    } catch (e) {
        next(e)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (e) {
        // res.status(500).json(e)
        next(e)
    }
}

export const getAllHotel = async (req, res, next) => {
    try {
        const allHotel = await Hotel.find()
        res.status(200).json(allHotel)
    } catch (e) {
        next(e)
    }
}


