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

// check if user is active (online)
const findFriend = (friendId) => {
  return activeUsers.find((user) => user.userId === friendId);
};

io.on('connection', (socket) => {
  console.log('socket is connecting....');

  socket.on('addActiveUser', (userId, userInfo) => {
    // receiving from FE
    addUser(userId, userInfo, socket.id);
    io.emit('getActiveUser', activeUsers); // sending to FE
  });

  socket.on('sendMessage', (data) => {
    const user = findFriend(data.receiverId);
    if (user !== undefined && user.length !== 0) {
      socket.to(user.socketId).emit('getMessage', data);
    }
  });

  // set seen message
  socket.on('messageSeen', (message) => {
    const user = findFriend(message.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('messageSeenResponse', message);
    }
  });

  // set message delivered
  socket.on('deliveredMessage', (message) => {
    const user = findFriend(message.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('messageDeliveredResponse', message);
    }
  });

  socket.on('seen', (data) => {
    const user = findFriend(data.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('seenSuccess', data);
    }
  });

  socket.on('typingMessage', (data) => {
    const user = findFriend(data.receiverId);
    if (user !== undefined && user.length !== 0) {
      socket.to(user.socketId).emit('getTypingMessage', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });
    }
  });

  socket.on('logout', (userId) => {
    activeUsers = activeUsers.filter((user = user.id !== userId));
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getActiveUser', activeUsers); // sending to FE
    console.log('user disconnected');
  });
});

io.listen(8000);
