const express=require("express");
const {PORT}=require("./config/serverConfig");
const http=require("http");
const socketio=require("socket.io");
const connect=require("./config/database");
const user=require("./Models/user")

const startServer=()=>{
    const app=express();
    const server=http.createServer(app);
    const io=socketio(server);

    app.set('view engine', 'ejs');

    io.on("connection",(socket)=>{
        console.log("socket is connected",socket.id);
        socket.on("join_room",(data)=>{
            console.log("room");
            socket.join(data.id);
        })
      
        socket.on("client_side",async(data)=>{
            const response=await user.create({
                content:data.message,
                userName:data.userName,
                roomId:data.id
            })
            io.to(data.id).emit("server_side",data);
        })
    })
   
    app.get("/frontend/:roomId",async(req,res)=>{
        const chats=await user.find({
            roomId:req.params.roomId
        })
        res.render("index",{
            id:req.params.roomId,
            chats:chats
        });
    })
    server.listen(PORT,async(req,res)=>{
        console.log(`Listening on the PORT ${PORT}`);
        await connect();
        console.log("connected");
    })


}
startServer();
module.exports=startServer;