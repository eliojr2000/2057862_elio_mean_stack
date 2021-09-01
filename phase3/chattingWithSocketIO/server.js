let express = require("express");
let app = express();
let ws = require("express-ws")(app);

let readline = require("readline");
let r1 = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

// http://localhost:9090
// open the html static web page 
app.get("/",(req , res)=>
{
    res.sendFile(__dirname + "/client.html");
})

app.ws("/", (socket, request)=>
{
    // recieve message from client application 
    socket.on("message",(msg)=>
    {
        console.log(msg);
    });

    r1.on("line", (input) =>
    {
        socket.send(input);
    })

})


app.listen(9090,()=>console.log("Server running on port number 9090"));



