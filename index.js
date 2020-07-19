var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();

//Add port
var server = app.listen(1616, function(){
    console.log("Listening to port 1616");
});

//Static Files
app.use(express.static('src'));

//Socket connection
var io = socket(server);

io.on('connection', function(socket){
    console.log('socket connection made', socket.id);
    //For message to be updated on every client
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    //For typing part to be updated on all other client except the current
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});


//https://cdnjs.com/libraries/socket.io
