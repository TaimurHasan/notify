const socketIO = require('socket.io');
const { addMessage, getMessages } = require('./messages')

// return a socket.io server
exports.sio = server => {
    return socketIO(server, {
        transport: ["polling"],
        cors: {
            origin: '*'
        }
    })
};

exports.connection = io => {
    io.on('connection', socket => {
        console.log(`A user is connected: ${socket.id}`);

        socket.on('sendMessage', (data) => {
            socket.broadcast.emit("receiveMessage", data)
        });

        socket.on('getMessages', () => {
            const messages = getMessages();
        })

        socket.on('disconnect', () => {
            console.log(`socket ${socket.id} disconnected`)
        })
    })
}