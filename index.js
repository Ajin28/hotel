import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"

dotenv.config()
const app = express()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to db");
    } catch (e) {
        throw e
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("db disconnected");
})

mongoose.connection.on("connected", () => {
    console.log("db connected");
})

app.listen(8000, () => {
    connect()
    console.log("connected to backend :) !!");
})
