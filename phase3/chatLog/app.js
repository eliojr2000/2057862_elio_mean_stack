let express = require("express");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";

let app = express();
let http = require("http").Server(app);
let io = require('socket.io')(http);

app.get("/", (req, res) =>
{
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) =>
{
    console.log("Client has connected");

    socket.emit("status", "Connection to server successful");

    socket.on("saveMessage", (msg) =>
    {
        MongoClient.connect(url, (err, client) =>
        {
            if(!err)
            {
                let db = client.db("logs_db")
                db.collection("logs").insertOne(msg);
                socket.emit("status", "Message sent successfully");
            }
            else
            {
                socket.emit("status", "Error sending message: " + err);
                console.log(err);
            }
        });
    });
});

http.listen(9090, () => console.log("Server running on port number 9090"));