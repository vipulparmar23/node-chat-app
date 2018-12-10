var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No Error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    //console.log('Users list', users);
    var ol = $('<ol></ol>');
    
    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

// createMessage event on client side triggers the newMessage event on server
// Listening a newMessage event from server
socket.on('newMessage', function (message) {
    // console.log('newMessage: ', message);

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
    scrollToBottom();
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
    scrollToBottom();
});