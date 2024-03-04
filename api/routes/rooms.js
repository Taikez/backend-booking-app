import express from "express"
import { createRoom, deleteRoom, updateRoom, getRoom, getRooms } from "../controllers/RoomController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/create/:hotelid", verifyAdmin, createRoom)

router.put("/update/:id", verifyAdmin, updateRoom)

router.delete("/delete/:id/:hotelid", verifyAdmin, deleteRoom)

router.get("/get/:id", getRoom)

router.get("/get", getRooms)

export default router