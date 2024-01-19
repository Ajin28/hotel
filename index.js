import express from "express"
import dotenv from 'dotenv'
import hotel_router from "./routes/hotels.js"
import room_router from "./routes/rooms.js"
import user_router from "./routes/users.js"
import auth_router from "./routes/auth.js"
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


app.use(express.json())
app.use("/hotel/v1", hotel_router)



app.listen(8000, () => {
    connect()
    console.log("connected to backend :) !!");
})
