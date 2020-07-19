//Make socket connection to front end
var socket = io.connect('http://localhost:1616');

//Variables for query
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var send = document.getElementById('send');
var output = document.getElementById('output');
var typing = document.getElementById('typing');

//Emit events to all clients on server
send.addEventListener('click', function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value="";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//DOM change
socket.on('chat', function(data){
    typing.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    typing.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
