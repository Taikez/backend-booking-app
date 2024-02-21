import express from "express"
import { deleteUser, updateUser, getUser, getUsers } from "../controllers/UserController.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/checkauthentication", verifyToken, (req, res, next)=> {
    res.send("Hello, User! You have successfully logged in.")
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=> {
    res.send("Hello, User! You have successfully logged in. You are able to delete your account.")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=> {
    res.send("Hello, Admin! You have successfully logged in.")
})

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser)

router.get("/:id", verifyUser, getUser)

router.get("/", verifyAdmin, getUsers)

export default router