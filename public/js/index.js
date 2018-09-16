var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // Emit createMessage event to server
    socket.emit('createMessage', {
        to: 'vipul',
        text: 'how are you?'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// Listening a newMessage event from server
socket.on('newMessage', function(message){
    console.log('newMessage: ', message);
})

