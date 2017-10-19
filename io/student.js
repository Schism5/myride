//const io = require('./../app');
const Stash = require('./../util/stash');

module.exports = io => {
    io.on('connection', (socket) => {
        console.log('new user connected to socket' + socket.id);
        var stash = new Stash();
    
        socket.on('disconnect', () => {
            console.log('client disconnected from socket ' + socket.id);
        });
    
        socket.emit('addstudent', {
    
        });
    
        socket.on('create-email', (email) => {
            console.log(email);
        });
    });
};