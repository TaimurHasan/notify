import { useEffect, useState } from 'react';

const Room = ({ socket }) => {


  const [message, setMessage] = useState(""); 
  const [messageReceived, setMessageReceived] = useState("");

  const handleClick = () => {
    // set room state
    const { roomNumber, username } = JSON.parse(localStorage.getItem('userInfo')) || "";
    socket.emit('sendMessage', { username, message, roomNumber })
  }

  useEffect(() => {
    
    socket.on("receiveMessage", (data) => {
      setMessageReceived({ 
        message: data.message,
        username: data.username
    });
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
        {messageReceived && <p> {messageReceived.message} from {messageReceived.username} </p>}
      </div>
  );
}

export default Room;
