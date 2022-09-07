import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Room = ({ socket }) => {


  const [message, setMessage] = useState(""); 
  const [messageReceived, setMessageReceived] = useState([]);

  const handleClick = () => {
    // set room state
    const { roomNumber, username } = JSON.parse(localStorage.getItem('userInfo')) || "";
    socket.emit('sendMessage', { username, message, roomNumber })
  }

  useEffect(() => {
    
    socket.on("receiveMessage", (data) => {
      setMessageReceived(current => [...current, {
        key: uuidv4(),
        message: data.message,
        username: data.username
      }]);
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
        {messageReceived.length && messageReceived.map((currentMessage) => (<p key={currentMessage.key}> {currentMessage.message} from {currentMessage.username} </p>))}
      </div>
  );
}

export default Room;
