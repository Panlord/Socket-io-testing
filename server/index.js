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

const user = {}
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log(`${msg} from ${socket.id}`);
    io.emit('chat message', {name:user[socket.id], msg:msg});
  });

  socket.on('new-user', name => {
    user[socket.id] = name
    console.log('this is the name', name)
    io.emit('user-connected', name)
  })

  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
