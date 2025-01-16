import logo from './logo.svg';
import './App.css';

import ChatRoom from './chatroom.js'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {io} from "socket.io-client"
const socket = io.connect("http://localhost:3001")
function App() {
  
  const router = createBrowserRouter([

    {
      path:"/",
      element:<ChatRoom/>
    }
    
    ])
  return (
    <RouterProvider router={router}/>
    
  )
}

export default App;
