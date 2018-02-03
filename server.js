var express = require('express');
var socketIO = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const PORT = process.env.PORT || 8080;

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
//
// io.on('connection', socket => {
//   socket.on('message', (message, callback) => {
//     io.to(rooms.name).emit('sendNote', {
//       message: message.message
//     });
//     callback();
//   });
//   socket.on('join', (params, callback) => {
//     socket.join(params.name);
//     rooms.name = params.name;
//     console.log(socket.rooms);
//     // socket.on('message', message => {
//     //   console.log(message.message);
//     //   io
//     //     .of('/backend')
//     //     .to(params.name)
//     //     .emit('sendNote', {
//     //       message: message.message
//     //     });
//     // });
//     callback();
//   });
//   socket.on('chat', socket_id => {
//     io.to(socket_id.id).emit('sendNote', {
//       message: socket_id.message
//     });
//   });
//   // socket.on('disconnect', () => {
//   //   console.log('user was disconnected');
//   // });
// });

server.listen(PORT, () => {
  console.log(`server is up on port ${PORT}`);
});
