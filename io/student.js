//const io = require('./../app');
const RoomManager = require('./../util/RoomManager');

module.exports = (io) => {
    let i = 1;
    io.on('connection', (socket) => {
        console.log('new user connected to socket' + socket.id);
        var manager = new RoomManager();
    
        socket.on('disconnect', () => {
            console.log('client disconnected from socket ' + socket.id);
        });
    });
};