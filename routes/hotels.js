import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// create
router.post("/", async (req, res) => {

    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})
// delete
// get
// get all

export default router