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

    $('#message-form').on('submit', function (event) {
        event.preventDefault();

        var messageTextbox = $('[name = message]');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('');
        });
    });

    // $("#message-form").submit(function (event) {
    //     event.preventDefault();

    //     socket.emit('createMessage', {
    //         from: 'User',
    //         text: $('[name = message]').val()
    //     }, function () {
    //         console.log('Submitted and checked');
    //         $('[name = message]').val('')
    //     });
    // });

    var locationButton = $('#location-button');

    locationButton.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by browser');
        }

        locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to get location');
        });
    });
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target = "_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});