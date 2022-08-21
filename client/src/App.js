import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io.connect("http://localhost:9013")

function App() {
  
  const [message, setMessage] = useState(""); 
  const [messageReceived, setMessageReceived] = useState("");

  const handleClick = () => {
    socket.emit('sendMessage', { message })
  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket])

  return (
    <div className='App'>
      <p>Notify</p>
      <form>
        <input placeholder='Message...'  onChange={(event) => {
          setMessage(event.target.value)
        }}/>
        <button type="button" onClick={handleClick}>
          Send
        </button>
      </form>
      <h1> {messageReceived} </h1>
    </div>
  );
}

export default App;
