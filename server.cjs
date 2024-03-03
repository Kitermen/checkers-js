const express = require("express")
const app = express()
const PORT = 5000;
const path = require("path")
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const socketio = new Server(server);

app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile(path.join(__dirname + "/index.html"))
})

socketio.on('connection', (client) => {
    //console.log("klient się podłączył z id = ", client.id)

    //oczywiste
    client.emit("onconnect", {
        clientId: client.id
    })

    //oczywiste
    client.on("disconnect", (reason) => {
        //console.log("klient się rozłącza", reason)
    })

    //czekanie na login 1 i 2 użytkownika
    client.on("response", () => {
        client.broadcast.emit("response")
    })

    //aktywna gra użtykowników
    client.on("exchange", (zmiany) => {
        //console.log("ZMIANY", zmiany);
        client.broadcast.emit("exchange", zmiany)
    })

    //puste
    client.on("reqexchange", () => {
        client.broadcast.emit("reqexchange")
    })

});
let usersOnline = [];
app.use(express.json())
app.post("/user-add", function (req, res) {
    const isUser = usersOnline.filter(user => user.login == req.body.login).length

    if (isUser) {
        let obj = { type: "error", kodbledu: 0 };
        res.json(obj);
        return;
    }
    
    if (usersOnline.length >= 2) {
        let obj = { type: "error", kodbledu: 1 }
        res.json(obj)
        return
    }

    usersOnline.push(req.body)
    let obj = { type: "success", login: req.body.login, playersNum: usersOnline.length }
    res.json(obj)

})


app.post("/Reset", function (req, res) {
    usersOnline = [];
})


app.use(express.static('static'))
server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})