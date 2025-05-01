const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
    //  So socket is not something you define — it's provided by the Socket.IO server library when a client connects. 

  console.log('User connected:', socket.id);

  socket.on('add_todo', (item) => {
    // broadcast to all except sender
    socket.broadcast.emit('add_todo', item);
  });

  socket.on('delete_todo', (id) => {
    socket.broadcast.emit('delete_todo', id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  setTimeout(()=>{
    socket.emit('notification',{
        type:'success',
        message: 'Backend Triggered Notification after 5 seconds'
    });
  },5000)
});



server.listen('https://crudsocket.netlify.app/', () => {
  console.log('Server listening on port 4001');
});
