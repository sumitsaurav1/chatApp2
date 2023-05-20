let express = require("express");
let app = express();
let server = require("http").Server(app);

app.use(express.static("public"));
let io = require("socket.io")(server);

io.on("connection",(socket)=>{
    console.log("socket",socket.id)
    socket.on("message",(data)=>{
        io.emit("message",data)
    })

    socket.on("disconnect",()=>{
        console.log("user left the chat ", socket.id)
    })
})
let port =3000;

server.listen(port,()=>{
    console.log("servr")
})
