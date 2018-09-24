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
    var timestamp = moment(message.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // li.text(`${message.from} ${timestamp}: ${message.text}`);

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: timestamp
    });
    $('#messages').append(html);
    //$('#messages').append(li)
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
    var timestamp = moment(message.createdAt).format('h:mm a');
    var template = $('#location-template').html();

    // Passing the message information (from, url) along with template to the render method of Mustache
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: timestamp
    });

    $('#messages').append(html);
});