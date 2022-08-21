import { useState } from "react";
import io from 'socket.io-client';
import Room from "../../Pages/Room";
const socket = io.connect("http://localhost:9013");

const Login = () => {
    const [formState, setFormState] = useState({ username: '', roomNumber: 'Room 1'})

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('userInfo', JSON.stringify(formState))

        if (formState.roomNumber !== "") {
            socket.emit('joinRoom', formState.roomNumber)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <input placeholder='Username' name='username' value={formState.username} onChange={handleChange}/>
            <label htmlFor="roomNumber">Room Number</label>
            <select name='roomNumber' value={formState.roomNumber} onChange={handleChange}>
                <option value='Room 1'>Room 1</option>
                <option value='Room 2'>Room 2</option>
                <option value='Room 3'>Room 3</option>
            </select>
            <button type="submit">
                Join Room
            </button>
            </form>
            <Room socket={socket}/> 
        </>
    )
};

export default Login;