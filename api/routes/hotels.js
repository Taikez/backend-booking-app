import express from "express"
import { createHotel, deleteHotel, updateHotel, getHotel, getHotels, countByCity, countByType } from "../controllers/HotelController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/create", verifyAdmin, createHotel)

router.put("/update/:id", verifyAdmin, updateHotel)

router.delete("/delete/:id", verifyAdmin, deleteHotel)

router.get("/get/:id", getHotel)

router.get("/get", getHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)

export default router