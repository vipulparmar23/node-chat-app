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

