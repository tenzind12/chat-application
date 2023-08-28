const express = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);

// socket
const { Server } = require('socket.io');
const io = new Server(expressServer);

// path
const path = require('path');

io.on('connection', (socket) => {
  console.log('user connected');

  setTimeout(() => {
    socket.emit('msg', 'this is the msg from server');
  }, 2000);

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

app.use(express.static('chatapp-client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'chatapp-client', 'build', 'index.html'));
});

app.get('/server', (req, res) => {
  res.end('this is backend');
});

expressServer.listen(5000, () => {
  console.log('http://localhost:5000');
});
