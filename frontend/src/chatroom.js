import {useRef,useState,useEffect} from 'react'
import {io} from "socket.io-client"
const socket = io.connect("http://localhost:3001")
function ChatRoom(){
  
  const roomNoRef=useRef()
  const messageRef=useRef()
  const [roomNo,setRoomNo]=useState("")
  const [message,setMessage]=useState([])
  const [messageRecieved,setMessageRecieved]=useState("")
  
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setMessageRecieved(data.message)
    })
  },[socket])
  
  
  function handleConnectBtn(){
  const roomNumber=roomNoRef.current.value
  setRoomNo(roomNumber)
  
  socket.emit("join_room",roomNumber)
}


  
  function handleSendBtn(){
    
  
  const newMsg=messageRef.current.value
  setMessage(prevMsg=>[...prevMsg,newMsg])
  socket.emit("send_message",{message:messageRef.current.value,roomNo})
  messageRef.current.value=""
  }
  
  
  
  return(<nav className="chatNav">
        <div className="chatDiv">
            <ul>
            {message.map((msg)=>(<li className="messages">{msg}</li>))}
             <li className="messages">{messageRecieved}</li>
              
      <li className="roomInputList">   <input type="number" ref={roomNoRef} className="roomInput" placeholder="ROOM NO(1-20 share the no)"/><button onClick={handleConnectBtn} className="sendBtn">connect</button></li>
      <li className="messageInputList">   <input ref={messageRef}  className="roomInput" placeholder="enter message.."/><button onClick={handleSendBtn} className="sendBtn">SEND</button></li>
        
         
            </ul>
       </div> 
</nav>
    )
}
export default ChatRoom