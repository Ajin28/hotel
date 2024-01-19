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
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

// delete
router.delete("/:id", async (req, res) => {
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

// get
router.get("/:id", async (req, res) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(get)
    } catch (e) {
        res.status(500).json(e)
    }
})

// get all
router.get("/", async (req, res) => {
    try {
        const allHotel = await Hotel.find()
        res.status(200).json(allHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})


export default router