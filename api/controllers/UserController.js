import User from "../models/User.js"
import { createError } from "../utils/error.js"

export const updateUser = async(req, res, next) => {
    try { 
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true },
        )
        if(updatedUser === null || updatedUser === undefined) return next(createError(404, "User not found."))
        else res.status(200).json(updatedUser)
    } catch(err){
        next(err)
    }
}

export const deleteUser = async(req, res, next) => {
    try { 
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(deletedUser === null || deletedUser === undefined) return next(createError(404, "User not found."))
        else res.status(200).json("User successfully deleted.")
    } catch(err){
        next(err)
    }
}

export const getUser = async(req, res, next) => {
   try { 
        const user = await User.findById(req.params.id)
        if(user === null || user === undefined) return next(createError(404, "User not found."))
        else res.status(200).json(user)
    } catch(err){
        next(err)
    }
}

export const getUsers = async(req, res, next) => {
   try { 
        const users = await User.find()
        res.status(200).json(users)
    } catch(err){
        next(err)
    }
}