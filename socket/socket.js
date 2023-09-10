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

io.on('connection', (socket) => {
  console.log('socket is connecting....');

  socket.on('addActiveUser', (userId, userInfo) => {
    addUser(userId, userInfo, socket.id); // receiving from FE
    io.emit('getActiveUser', activeUsers); // sending to FE
  });
});

io.listen(8000);
