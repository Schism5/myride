const express = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');

require('./database/mongoose');

var app = express();
var server = http.createServer(app);
var io = socketio(server);

require('./io/student')(io);

const port = process.env.PORT || 3000;

//logger
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url} \n`;

    fs.appendFile('server.log', log, err => {
        if(err) console.log('Unable to reach server.log');
    });
    
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/student', require('./route/student'));

server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});