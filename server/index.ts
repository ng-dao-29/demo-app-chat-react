import express from 'express'
import http from "http";

const app = express();
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const PORT = 3001;
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});