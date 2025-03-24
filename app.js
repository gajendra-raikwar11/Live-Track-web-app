const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send-location", (data) => {
        io.emit("receive-location", {
            id: socket.id,
            latitude: data.latitude,
            longitude: data.longitude,
        });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
