const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3003;
const { createServer } = require('http'); 
const { Server } = require('socket.io');

dotenv.config({
    path: './config.env'
})

const app = express();

// socket utils
const socketUtils = require('./utils/socketUtils');

const httpServer = createServer(app);
const io = socketUtils.sio(httpServer);

// pass instance of socket io
socketUtils.connection(io);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const socketIOMiddleware = (req, res, next) => {
    req.io = io;

    next();
};

app.use(cors());


app.use('/api/v1/hello', socketIOMiddleware, (req, res) => {
    req.io.emit('message', `Hello, ${req.originalUrl}`);
    res.send('hello world!');
})

// listen
const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
    console.log(`App running on port ${port}`);
})
