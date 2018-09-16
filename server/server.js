// Basically, createMessage event is emitted by client (while creating new message) and listened by server
// newMessage event is emitted by server whenever a new message arrives. It is listened by client

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', {
        from: 'Jordan',
        text: 'Hi',
        createdAt: 12478
    });

    // listening to createMessage event emitted by client
    socket.on('createMessage', (message) => {
        console.log('createMessage: ', message);    
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

console.log(__dirname + '/../public');
console.log(publicPath);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});