var express = require('express');
var socketIO = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
  console.log('new user connected');
  socket.on('newnote', message => {
    console.log(message.note);
    socket.emit('sendNote', {
      notes: message.note
    });
  });
  socket.on('disconnect', () => {
    console.log('user was disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
