const socketIO = require('socket.io');

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

        socket.on('joinRoom', (data) => {
            socket.join(data);
        })

        socket.on('sendMessage', (data) => {
            socket.to(data.roomNumber).emit("receiveMessage", data)
        });

        socket.on('disconnect', () => {
            console.log(`socket ${socket.id} disconnected`)
        })
    })
}