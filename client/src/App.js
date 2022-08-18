import {useEffect, useRef} from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9013");

    socket.current.on("connection", () => {
      console.log('Connected to server')
    })
  }, []);

  const handleClick = () => {
    socket.current.emit("message", new Date().getTime());
  }

  return (
    <div className='App'>
      <p>Socket.io app</p>

      <button type="button" onClick={handleClick}>
        Emit
      </button>
    </div>
  );
}

export default App;
