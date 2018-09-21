// Basically, createMessage event is emitted by client (while creating new message) and listened by server
// newMessage event is emitted by server whenever a new message arrives. It is listened by client

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected.');

    // socket.emit('newMessage', {
    //     from: 'Jordan',
    //     text: 'Hi',
    //     createdAt: 12478
    // });

    // Welcome message to user from admin
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app, buddy!!'));

    // Notifications to all users about a new user joining chat, using broadcast to exclude user itself
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user has joined chat'));

    // listening to createMessage event emitted by client
    socket.on('createMessage', (message) => {
        console.log('createMessage: ', message);  

        // This function sends the message to everyone including ownself
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`));
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