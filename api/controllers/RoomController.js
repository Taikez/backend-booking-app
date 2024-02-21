import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const createRoom = async(req, res, next)=> {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(
                hotelId, { 
                    $push: { rooms: savedRoom._id } 
                },
            )
        } catch(err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch(err) {
        next(err)
    }
}

export const updateRoom = async(req, res, next) => {
    try { 
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true },
        )
        if(updatedRoom === null || updatedRoom === undefined) return next(createError(404, "Room not found."))
        else res.status(200).json(updatedRoom)
    } catch(err){
        next(err)
    }
}

export const deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid 
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id)
        if(deletedRoom === null || deletedRoom === undefined) return next(createError(404, "Room not found."))
        try {
            await Hotel.findByIdAndUpdate(
                hotelId, { 
                    $pull: { rooms: req.params.id } 
                },
            )
        } catch(err) {
            next(err)
        }
        res.status(200).json("Room successfully deleted.")
    } catch(err){
        next(err)
    }
}

export const getRoom = async(req, res, next) => {
   try { 
        const room = await Room.findById(req.params.id)
        if(room === null || room === undefined) return next(createError(404, "Room not found."))
        else res.status(200).json(room)
    } catch(err){
        next(err)
    }
}

export const getRooms = async(req, res, next) => {
   try { 
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch(err){
        next(err)
    }
}