const express = require("express");
const app = express();
const PORT = 3300;
const path = require("path");
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const socketio = new Server(server);

app.use(express.static('static'))



app.get("/", function (req, res) {
    console.log(path.join(__dirname, "index.html"));
    res.sendFile(path.join(__dirname, "index.html"))
})




















server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})