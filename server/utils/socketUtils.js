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
        console.log('A user is connected');

        socket.on('message', message => {
            console.log(`Message from ${socket.id} : ${message}`)
        });

        socket.on('disconnect', () => {
            console.log(`socket ${socket.id} disconnected`)
        })
    })
}