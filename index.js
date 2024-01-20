import express from "express"
import dotenv from 'dotenv'
import hotel_router from "./routes/hotels.js"
import room_router from "./routes/rooms.js"
import user_router from "./routes/users.js"
import auth_router from "./routes/auth.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

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

app.use(cookieParser())
app.use((req, res, next) => {
    console.log("I am a Middleware");
    next()
})
app.use(express.json())
app.use("/auth/v1", auth_router)
app.use("/hotel/v1", hotel_router)
app.use("/user/v1", user_router)

app.use((err, req, res, next) => {
    console.log("I am a Error Handling Middleware");
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        status: 0,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8000, () => {
    connect()
    console.log("connected to backend :) !!");
})
