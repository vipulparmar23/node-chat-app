// Basically, createMessage event is emitted by client (while creating new message) and listened by server
// newMessage event is emitted by server whenever a new message arrives. It is listened by client

const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected.');

    // socket.emit('newMessage', {
    //     from: 'Jordan',
    //     text: 'Hi',
    //     createdAt: 12478
    // });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.roomName)) {
            callback('Name and room name are required.');
        }

        socket.join(params.roomName);
        //Remove the user from any previous rooms before adding to new one
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.roomName);

        io.to(params.roomName).emit('updateUserList', users.getUserList(params.roomName));

        // Welcome message to user from admin
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app, buddy!!'));

        // Notifications to all users about a new user joining chat, using broadcast to exclude user itself
        socket.broadcast.to(params.roomName).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    // listening to createMessage event emitted by client
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage: ', message);

        // This function sends the message to everyone including ownself
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', `${coords.latitude}`, `${coords.longitude}`));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        var user = users.removeUser(socket.id);
        
        console.log('removed user is: ', user);
        
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        
    });
});

console.log(__dirname + '/../public');
console.log(publicPath);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});
