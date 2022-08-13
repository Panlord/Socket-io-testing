const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'), (error) => {
    if (error) {
      response.status(500).send(error);
    }
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
