var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// createMessage event on client side triggers the newMessage event on server
// Listening a newMessage event from server
socket.on('newMessage', function (message) {
    console.log('newMessage: ', message);
    
    // The message data arrives in message variable

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$(document).ready(function () {
    $("#message-form").submit(function (event) {
        event.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: $('[name = message]').val()
        }, function () {

        });
    });
});
