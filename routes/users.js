import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
const router = express.Router();

router.get("/check_auth", verifyToken, (req, res, next) => {
    res.send("Hi user, you are authenticated!")
})

router.get("/check_user/:id", verifyUser, (req, res, next) => {
    res.send("Hi user, you are authorized")
})

router.get("/check_admin/", verifyAdmin, (req, res, next) => {
    res.send("Hi admin, you are authorized")
})

// update
router.put("/:id", verifyUser, updateUser)

// delete
router.delete("/:id", verifyUser, deleteUser)

// get
router.get("/:id", verifyUser, getUser)

// get all
router.get("/", verifyAdmin, getAllUser)


export default router