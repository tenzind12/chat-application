const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let activeUsers = [];

const addUser = (userId, userInfo, socketId) => {
  const checkUser = activeUsers.some((activeUser) => activeUser.userId === userId);
  if (!checkUser) {
    activeUsers.push({ userId, userInfo, socketId });
  }
};

const removeUser = (socketId) => {
  activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  console.log('socket is connecting....');

  socket.on('addActiveUser', (userId, userInfo) => {
    // receiving from FE
    addUser(userId, userInfo, socket.id);
    io.emit('getActiveUser', activeUsers); // sending to FE
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getActiveUser', activeUsers); // sending to FE
    console.log('user disconnected');
  });
});

io.listen(8000);
