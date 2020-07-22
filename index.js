var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();

//Add port
var port = process.env.PORT || 1616;
var server = app.listen(port, function(){
    console.log("Listening to port",port);
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
