import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";


export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotel_id
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)

    } catch (e) {
        next(e)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (e) {
        next(e)
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const hotelId = req.params.hotel_id
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (err) {
            return next(err)
        }
        res.status(200).json(deleteRoom)
    } catch (e) {
        next(e)
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (e) {
        // res.status(500).json(e)
        next(e)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const allRoom = await Room.find()
        res.status(200).json(allRoom)
    } catch (e) {
        next(e)
    }
}


