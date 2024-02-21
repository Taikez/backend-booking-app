import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"

const app = express();
dotenv.config();

const handleError = (error) => {
    console.error("MongoDB Error:", error);
};

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.");
    } catch (error) {
        handleError(error);
        console.log("Unable to connect to MongoDB.");
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected.");
});

mongoose.connection.on("error", (error) => {
    handleError(error);
});

// Middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong."
    const errorStack = err.stack

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: errorStack,
    })
})


connect().then(() => {
    app.listen(8800, () => {
        console.log("Connected to backend.");
    });
});
