const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (request, response) => {
  response.send('<h1>Whaddup boss</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
