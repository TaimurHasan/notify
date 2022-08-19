import { useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const socket = io.connect("http://localhost:9013")

  const handleClick = () => {
    socket.emit('sendMessage', {message: "hello"})

  }

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      alert(data.message)
    })
  }, [socket])

  return (
    <div className='App'>
      <p>Socket.io app</p>
      <div>
        
      </div>
      <button type="button" onClick={handleClick}>
        Emit
      </button>
    </div>
  );
}

export default App;
