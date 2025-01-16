const http = require("http")
const {Server}=require("socket.io")
const express = require("express")
const cors=require('cors')
const app = express()
const server = http.createServer(app)

app.use(cors())

const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000"
  },
})
io.on("connection",(socket)=>{
  console.log(`user sucessfully connected with id ${socket.id}`)
  socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`user joined to room number :${data}`)
  })
  socket.on("send_message",(data)=>{
    socket.to(data.roomNo).emit("recieve_message",data)
  })
})
server.listen(3001,()=>{
  console.log("server running on port 3001...")
})